import { InMemoryPlantsRepository } from "@/infra/repositories/in-memory/in-memory-plants-repository";
import { InMemoryUsersRepository } from "@/infra/repositories/in-memory/in-memory-users-repository";
import { RegisterNewPlantUseCase } from "./register-new-plant";

let plantsRepository: InMemoryPlantsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: RegisterNewPlantUseCase;

describe("Register New Plant Use Case", () => {
  beforeEach(() => {
    plantsRepository = new InMemoryPlantsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterNewPlantUseCase(plantsRepository, usersRepository);
  });

  it("should be able register new plant", () => {});
});
