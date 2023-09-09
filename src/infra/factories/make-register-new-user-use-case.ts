import { RegisterNewUserUseCase } from "@/domain/application/use-cases/register-new-user";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users.repository";

export function MakeRegisterNewUserUseCase() {
  const prismaService = new PrismaService();
  const usersRepository = new PrismaUsersRepository(prismaService);

  const useCase = new RegisterNewUserUseCase(usersRepository);

  return useCase;
}
