import { IPlantRepository } from "../repositories/plant.repository";
import { NotAllowedError } from "./errors/not-allowed.error";
import { PlantNotFoundError } from "./errors/plant-not-found.error";

interface DeletePlantRequest {
  ownerId: string;
  plantId: string;
}

type DeletePlantResponse = void;

export class DeletePlantUseCase {
  constructor(private plantRepository: IPlantRepository) {}

  async execute({
    plantId,
    ownerId,
  }: DeletePlantRequest): Promise<DeletePlantResponse> {
    const plant = await this.plantRepository.findById(plantId);

    if (!plant) {
      throw new PlantNotFoundError();
    }

    if (ownerId !== plant.ownerId) {
      throw new NotAllowedError();
    }

    await this.plantRepository.delete(plant);
  }
}
