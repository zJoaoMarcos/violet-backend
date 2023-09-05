import { Plant } from "../../enterprise/entities/plant";
import { IPlantRepository } from "../repositories/plant.repository";
import { IUserRepository } from "../repositories/user.repository";
import { PlantWithSameNameAlreadyExistsError } from "./errors/plant-with-same-name-already-exisits.error";
import { UserNotFoundError } from "./errors/user-not-found.error";

interface RegisterNewPlantRequest {
  name: string;
  age: number;
  kind: string;
  serial: string;
  userId: string;
}

interface RegisterNewPlantResponse {
  plant: Plant;
}

export class RegisterNewPlantUseCase {
  constructor(
    private plantRepository: IPlantRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    kind,
    age,
    serial,
    userId,
  }: RegisterNewPlantRequest): Promise<RegisterNewPlantResponse> {
    const plantWithSameName = await this.plantRepository.findByName(name);

    if (plantWithSameName) {
      throw new PlantWithSameNameAlreadyExistsError();
    }

    const owner = await this.userRepository.findById(userId);

    if (!owner) {
      throw new UserNotFoundError();
    }

    const plant = Plant.create({
      name,
      age,
      kind,
      serial,
      owner,
    });

    await this.plantRepository.create(plant);

    owner.plants = [...owner.plants, plant];

    await this.userRepository.save(owner);

    return { plant };
  }
}
