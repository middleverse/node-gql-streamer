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
}
