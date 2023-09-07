import { IUserRepository } from "@/domain/application/repositories/user.repository";
import { User } from "@/domain/enterprise/entities/user";
import { EmailOrPasswordIncorretError } from "./errors/email-or-password-incorret.error";

import * as bcrypt from "bcrypt";

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  user: User;
}

export class SignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: SignInRequest): Promise<SignInResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        user.password = undefined;

        return { user };
      }
    }

    throw new EmailOrPasswordIncorretError();
  }
}
