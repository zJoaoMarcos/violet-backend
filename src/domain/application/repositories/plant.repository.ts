import { Plant } from "../../enterprise/entities/plant";

export interface IPlantRepository {
  create(plant: Plant): Promise<void>;
  save(plant: Plant): Promise<void>;
  findById(id: string): Promise<Plant>;
  findByOwner(owner: string): Promise<Plant[]>;
  delete(plant: Plant): Promise<void>;
}
