import { Plant } from "@/domain/enterprise/entities/plant";
import { IPlantRepository } from "../repositories/plant.repository";
import { IUserRepository } from "../repositories/user.repository";
import { PlantNotFoundError } from "./errors/plant-not-found.error";

interface EditPlantRequest {
  plantId: string;
  name: string;
  age: number;
  kind: string;
}

interface EditPlantResponse {
  plant: Plant;
}

export class EditPlantUseCase {
  constructor(
    private plantRepository: IPlantRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    plantId,
    name,
    kind,
    age,
  }: EditPlantRequest): Promise<EditPlantResponse> {
    const plant = await this.plantRepository.findById(plantId);

    if (!plant) {
      throw new PlantNotFoundError();
    }

    plant.name = name;
    plant.kind = kind;
    plant.age = age;

    await this.plantRepository.save(plant);

    return { plant };
  }
}
