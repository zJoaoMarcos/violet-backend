import { FindPlantByIdUseCase } from "@/domain/application/use-cases/find-plant-by-id";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaPlantsRepository } from "../database/prisma/repositories/prisma-plants.repository";

export function MakeFindPlantByIdUseCase() {
  const prismaService = new PrismaService();
  const plantsRepository = new PrismaPlantsRepository(prismaService);
  const useCase = new FindPlantByIdUseCase(plantsRepository);

  return useCase;
}
