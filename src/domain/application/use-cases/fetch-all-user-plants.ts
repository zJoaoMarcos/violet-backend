import { Plant } from "@/domain/enterprise/entities/plant";
import { IPlantRepository } from "../repositories/plant.repository";
import { IUserRepository } from "../repositories/user.repository";
import { PlantNotFoundError } from "./errors/plant-not-found.error";
import { UserNotFoundError } from "./errors/user-not-found.error";

interface FetchAllUserPlantRequest {
  userId: string;
}

interface FetchAllUserPlantResponse {
  plants: Plant[];
}

export class FetchAllUserPlantsUseCase {
  constructor(
    private plantRepository: IPlantRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    userId,
  }: FetchAllUserPlantRequest): Promise<FetchAllUserPlantResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const plants = await this.plantRepository.findByOwner(userId);

    if (!plants) {
      throw new PlantNotFoundError();
    }

    return { plants };
  }
}
