import { InMemoryPlantsRepository } from "@/infra/repositories/in-memory/in-memory-plants-repository";
import { InMemoryUsersRepository } from "@/infra/repositories/in-memory/in-memory-users-repository";
import { EditPlantUseCase } from "./edit-plant";
import { makeRegisterPlant } from "./factories/make-register-plant";

let plantsRepository: InMemoryPlantsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: EditPlantUseCase;

describe("Edit Plant Use Case ", () => {
  beforeEach(() => {
    plantsRepository = new InMemoryPlantsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new EditPlantUseCase(plantsRepository, usersRepository);
  });

  it("should be able to edit plant", async () => {
    const plant = makeRegisterPlant({ name: "violetinha" });
    plantsRepository.items.push(plant);

    const { plant: updatedPlant } = await sut.execute({
      plantId: plant.id.toString(),
      name: "fake-name",
      age: 2,
      kind: "violet",
    });

    expect(updatedPlant.name).toEqual("fake-name");
  });
});
