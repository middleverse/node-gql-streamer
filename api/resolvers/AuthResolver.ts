import { Arg, Mutation, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { UserModel } from "../entity/User";
import { AuthInput } from "../types/AuthInput";
import { UserResponse } from "../types/UserResponse";

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") { email, password }: AuthInput
  ): Promise<UserResponse> {
    // 1. Check for an existing email
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    // 2. Create new user with a hashed password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const user = new UserModel({ email, password: hashedPassword });

    await user.save();

    // 3. store user id on the token payload
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || "ahksjdh878d798d"
    );

    return { user, token };
  }
}
