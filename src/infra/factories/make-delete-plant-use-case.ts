import { DeletePlantUseCase } from "@/domain/application/use-cases/delete-plant";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaPlantsRepository } from "../database/prisma/repositories/prisma-plants.repository";

export function makeDeletePlantUseCase() {
  const prismaService = new PrismaService();
  const plantsRepository = new PrismaPlantsRepository(prismaService);

  const useCase = new DeletePlantUseCase(plantsRepository);

  return useCase;
}
