import { IPlantRepository } from "@/domain/application/repositories/plant.repository";
import { Plant } from "@/domain/enterprise/entities/plant";
import { PrismaPlantMapper } from "../mappers/prisma-plant.mapper";
import { PrismaService } from "../prisma";

export class PrismaPlantsRepository implements IPlantRepository {
  constructor(private prismaService: PrismaService) {}

  async create(plant: Plant): Promise<void> {
    await this.prismaService.plant.create({
      data: {
        id: plant.id.toString(),
        name: plant.name,
        kind: plant.kind,
        age: plant.age,
        serial: plant.serial,
        ownerId: plant.ownerId,
        createdAt: plant.createdAt,
      },
    });
  }

  async findById(id: string): Promise<Plant> {
    const plant = await this.prismaService.plant.findUnique({
      where: { id },
    });

    if (!plant) {
      return null;
    }

    return PrismaPlantMapper.toDomain(plant);
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

  async save(plant: Plant): Promise<void> {
    await this.prismaService.plant.update({
      where: { id: plant.id.toString() },
      data: {
        name: plant.name,
        kind: plant.kind,
        age: plant.age,
        serial: plant.serial,
        updatedAt: plant.updatedAt,
      },
    });
  }

  async delete(plant: Plant): Promise<void> {
    await this.prismaService.plant.delete({
      where: { id: plant.id.toString() },
    });
  }
}
