import { Plant } from "@/domain/enterprise/entities/plant";
import { IPlantRepository } from "../repositories/plant.repository";
import { PlantNotFoundError } from "./errors/plant-not-found.error";

interface FindPlantByIdRequest {
  id: string;
}

interface FindPlantByIdResponse {
  plant: Plant;
}

export class FindPlantByIdUseCase {
  constructor(private plantRepository: IPlantRepository) {}

  async execute({ id }: FindPlantByIdRequest): Promise<FindPlantByIdResponse> {
    const plant = await this.plantRepository.findById(id);

    if (!plant) {
      throw new PlantNotFoundError();
    }

    return { plant };
  }
}
