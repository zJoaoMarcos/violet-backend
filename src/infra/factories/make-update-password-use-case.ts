import { UpdatePasswordUseCase } from "@/domain/application/use-cases/update-password";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users.repository";

export function MakeUpdatePasswordUseCase() {
  const prismaService = new PrismaService();
  const usersRepository = new PrismaUsersRepository(prismaService);

  const useCase = new UpdatePasswordUseCase(usersRepository);

  return useCase;
}
