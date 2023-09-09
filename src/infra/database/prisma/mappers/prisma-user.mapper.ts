import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User } from "@/domain/enterprise/entities/user";
import { Plant as PlantPrisma, User as UserPrisma } from "@prisma/client";
import { PrismaPlantMapper } from "./prisma-plant.mapper";

export class PrismaUserMapper {
  static toDomain(raw: UserPrisma, plants: PlantPrisma[]): User {
    return User.create(
      {
        name: raw.name,
        surname: raw.surname,
        email: raw.email,
        password: raw.passsword,
        plants: plants?.map((plant) => PrismaPlantMapper.toDomain(plant)),
      },
      new UniqueEntityID(raw.id)
    );
  }
}
