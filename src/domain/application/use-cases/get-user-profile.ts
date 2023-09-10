import { User } from "@/domain/enterprise/entities/user";
import { IUserRepository } from "../repositories/user.repository";
import { UserNotFoundError } from "./errors/user-not-found.error";

interface GetUserProfileRequest {
  userId: string;
}

interface GetUserProfileResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return { user };
  }
}
