import { RegisterNewPlantUseCase } from "@/domain/application/use-cases/register-new-plant";
import { PrismaService } from "../database/prisma/prisma";
import { PrismaPlantsRepository } from "../database/prisma/repositories/prisma-plants.repository";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users.repository";

export function MakeRegisterPlantUseCase() {
  const prismaService = new PrismaService();
  const plantRepository = new PrismaPlantsRepository(prismaService);
  const userRepository = new PrismaUsersRepository(prismaService);
  const useCase = new RegisterNewPlantUseCase(plantRepository, userRepository);

  return useCase;
}
