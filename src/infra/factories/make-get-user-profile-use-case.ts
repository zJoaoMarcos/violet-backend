import { GetUserProfileUseCase } from "@/domain/application/use-cases/get-user-profile";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users.repository";

export function MakeGetUserProfileUseCase() {
  const prismaService = new PrismaService();
  const usersRepository = new PrismaUsersRepository(prismaService);

  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
