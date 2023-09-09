import { IPlantRepository } from "@/domain/application/repositories/plant.repository";
import { Plant } from "@/domain/enterprise/entities/plant";
import { PrismaPlantMapper } from "../mappers/prisma-plant.mapper";
import { PrismaService } from "../prisma";

export class PrismaPlantsRepository implements IPlantRepository {
  constructor(private prismaService: PrismaService) {}

  create(plant: Plant): Promise<void> {
    throw new Error("Method not implemented.");
  }
  save(plant: Plant): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Plant> {
    throw new Error("Method not implemented.");
  }

  async findByOwner(owner: string): Promise<Plant[]> {
    const plants = await this.prismaService.plant.findMany({
      where: { ownerId: owner },
    });

    if (!plants) {
      return null;
    }

    return plants.map(PrismaPlantMapper.toDomain);
  }

  findBySerial(serial: string): Promise<Plant> {
    throw new Error("Method not implemented.");
  }
  delete(plant: Plant): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
