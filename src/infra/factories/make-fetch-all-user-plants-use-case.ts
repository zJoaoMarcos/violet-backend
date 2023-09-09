import { FetchAllUserPlantsUseCase } from "@/domain/application/use-cases/fetch-all-user-plants";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaPlantsRepository } from "../database/prisma/repositories/prisma-plants.repository";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users.repository";

export function MakeFetchAllUserPlantsUseCase() {
  const prismaService = new PrismaService();
  const plantsRepository = new PrismaPlantsRepository(prismaService);
  const usersRepository = new PrismaUsersRepository(prismaService);

  const useCase = new FetchAllUserPlantsUseCase(
    plantsRepository,
    usersRepository
  );

  return useCase;
}
