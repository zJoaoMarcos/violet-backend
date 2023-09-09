import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Plant } from "@/domain/enterprise/entities/plant";
import { Plant as PrismaPlant } from "@prisma/client";

export class PrismaPlantMapper {
  static toDomain(raw: PrismaPlant) {
    return Plant.create(
      {
        name: raw.name,
        kind: raw.kind,
        age: raw.age,
        serial: raw.serial,
        ownerId: raw.ownerId,
      },
      new UniqueEntityID(raw.id)
    );
  }
}
