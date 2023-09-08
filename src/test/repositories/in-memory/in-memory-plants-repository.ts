import { IPlantRepository } from "@/domain/application/repositories/plant.repository";
import { Plant } from "@/domain/enterprise/entities/plant";

export class InMemoryPlantsRepository implements IPlantRepository {
  items: Plant[] = [];

  async create(plant: Plant): Promise<void> {
    this.items.push(plant);
  }

  async save(plant: Plant): Promise<void> {
    const plantIndex = this.items.findIndex((item) => item.equals(plant));

    this.items[plantIndex] = plant;
  }

  async findByOwner(owner: string): Promise<Plant[]> {
    const plants = this.items.filter(
      (plant) => plant.owner.id.toString() === owner
    );

    return plants;
  }

  async findBySerial(serial: string): Promise<Plant> {
    const plant = this.items.find((plant) => plant.serial === serial);

    if (!plant) {
      return null;
    }

    return plant;
  }

  async findById(id: string): Promise<Plant> {
    const plant = this.items.find((plant) => plant.id.toString() === id);

    if (!plant) {
      return null;
    }

    return plant;
  }

  async delete(plant: Plant): Promise<void> {
    const plantIndex = this.items.findIndex((item) => item.equals(plant));

    if (!plant) {
      return null;
    }

    this.items.splice(plantIndex, 1);
  }
}
