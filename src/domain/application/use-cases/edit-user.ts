import { User } from "@/domain/enterprise/entities/user";
import { IUserRepository } from "../repositories/user.repository";
import { EmailAlreadyRegisteredError } from "./errors/email-already-registered.error";
import { UserNotFoundError } from "./errors/user-not-found.error";

interface EditUserRequest {
  userId: string;
  name: string;
  surname: string;
  email: string;
}

interface EditUserResponse {
  user: User;
}

export class EditUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
    name,
    surname,
    email,
  }: EditUserRequest): Promise<EditUserResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (email !== user.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(email);

      if (userWithSameEmail) {
        throw new EmailAlreadyRegisteredError();
      }

      user.email = email;
    }

    user.name = name;
    user.surname = surname;

    await this.userRepository.save(user);

    return { user };
  }
}
