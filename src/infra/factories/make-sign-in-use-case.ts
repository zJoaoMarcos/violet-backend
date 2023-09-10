import { SignInUseCase } from "@/domain/application/use-cases/sign-in";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users.repository";

export function MakeSignInUseCase() {
  const prismaService = new PrismaService();
  const usersRepository = new PrismaUsersRepository(prismaService);

  const useCase = new SignInUseCase(usersRepository);

  return useCase;
}
