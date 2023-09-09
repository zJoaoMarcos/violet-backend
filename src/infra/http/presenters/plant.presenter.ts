import { Plant } from "@/domain/enterprise/entities/plant";

export class PlantPresenter {
  static toHTTP(plant: Plant) {
    return {
      id: plant.id.toString(),
      name: plant.name,
      kind: plant.kind,
      age: plant.age,
      serial: plant.serial,
      ownerId: plant.ownerId,
      createdAt: plant.createdAt,
    };
  }
}
