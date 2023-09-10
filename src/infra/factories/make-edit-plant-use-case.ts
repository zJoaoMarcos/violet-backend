import { EditPlantUseCase } from "@/domain/application/use-cases/edit-plant";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaPlantsRepository } from "../database/prisma/repositories/prisma-plants.repository";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users.repository";

export function MakeEditPlantUseCase() {
  const prismaService = new PrismaService();
  const plantsRepository = new PrismaPlantsRepository(prismaService);
  const usersRepository = new PrismaUsersRepository(prismaService);

  const useCase = new EditPlantUseCase(plantsRepository, usersRepository);

  return useCase;
}
