import { User } from "@/domain/enterprise/entities/user";
import { IUserRepository } from "../repositories/user.repository";

import * as bcrypt from "bcrypt";
import { EmailOrPasswordIncorretError } from "./errors/email-or-password-incorret.error";

interface UpdatePasswordRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
}

interface UpdatePasswordResponse {
  user: User;
}

export class UpdatePasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    currentPassword,
    newPassword,
  }: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (isPasswordValid) {
        user.password = newPassword;

        await this.userRepository.save(user);

        user.password = undefined;

        return { user };
      }
    }

    throw new EmailOrPasswordIncorretError();
  }
}
