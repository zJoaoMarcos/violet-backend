import { EditUserUseCase } from "@/domain/application/use-cases/edit-user";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users.repository";

export function MakeEditUserUseCase() {
  const prismaService = new PrismaService();
  const usersRepository = new PrismaUsersRepository(prismaService);

  const useCase = new EditUserUseCase(usersRepository);

  return useCase;
}
