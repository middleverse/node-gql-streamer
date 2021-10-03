import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "The User Model" })
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  email: string;

  // Private type - don't declare as field (you do for public types)
  @Property({ required: true })
  password: string;
}

export const UserModel = getModelForClass(User);
