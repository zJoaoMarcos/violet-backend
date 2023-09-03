import { User } from "@/domain/enterprise/entities/user";
import { IUserRepository } from "../repositories/user.repository";
import { EmailAlreadyRegisteredError } from "./errors/email-already-registered.error";

import * as bcrypt from "bcrypt";

interface RegisterNewUserRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface RegisterNewUserResponse {
  user: User;
}

export class RegisterNewUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    surname,
    email,
    password,
  }: RegisterNewUserRequest): Promise<RegisterNewUserResponse> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyRegisteredError();
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = User.create({
      name,
      surname,
      email,
      password: passwordHashed,
      plants: [],
    });

    return { user };
  }
}
