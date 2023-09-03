import { Plant } from "../../enterprise/entities/plant";

export interface IPlantRepository {
  create(plant: Plant): Promise<void>;
  save(plant: Plant): Promise<void>;
  findByName(name: string): Promise<Plant>;
  findBySerial(serial: string): Promise<Plant>;
  findById(id: string): Promise<Plant>;
  delete(plant: Plant): Promise<void>;
}
