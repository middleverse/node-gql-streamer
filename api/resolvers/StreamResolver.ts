import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Ctx,
  Arg,
  Root,
  UseMiddleware,
} from "type-graphql";
import { ObjectId } from "mongodb";
import { MyContext } from "../types/MyContext";
import { Stream, StreamModel } from "../entity/Stream";
import { User, UserModel } from "../entity/User";
import { ObjectIdScalar } from "../schema/object-id.scalar";
import { StreamInput } from "../types/StreamInput";
import { isAuth } from "../middleware/isAuth";

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  stream(@Arg("streamId", () => ObjectIdScalar) streamId: ObjectId) {
    // 1. find a single stream
    return StreamModel.findById(streamId);
  }

  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  streams(@Ctx() ctx: MyContext) {
    // 2. display all stream for the current user
    return StreamModel.find({ author: ctx.res.locals.userId });
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(
    @Arg("input") streamInput: StreamInput,
    @Ctx() ctx: MyContext
  ): Promise<Stream> {
    // 3. create a new stream for current user
    const stream = new StreamModel({
      ...streamInput,
      author: ctx.res.locals.userId,
    } as Stream); // as Stream is what makes TS start type checking our input variables

    await stream.save();

    return stream;
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async editStream(
    @Arg("input") streamInput: StreamInput,
    @Ctx() ctx: MyContext
  ): Promise<Stream> {
    const { id, title, description, url } = streamInput;

    const stream = await StreamModel.findOneAndUpdate(
      {
        // find by
        _id: id,
        author: ctx.res.locals.userId,
      },
      {
        // updates
        title,
        description,
        url,
      },
      {
        runValidators: true,
        new: true, // passes back updated stream obj
      }
    );

    if (!stream) {
      throw new Error("Stream not found");
    }

    return stream;
  }
}
