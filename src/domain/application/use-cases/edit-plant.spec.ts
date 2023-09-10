import { makeRegisterPlant } from "@/test/factories/make-register-plant";
import { InMemoryPlantsRepository } from "@/test/repositories/in-memory/in-memory-plants-repository";
import { EditPlantUseCase } from "./edit-plant";

let plantsRepository: InMemoryPlantsRepository;
let sut: EditPlantUseCase;

describe("Edit Plant Use Case ", () => {
  beforeEach(() => {
    plantsRepository = new InMemoryPlantsRepository();
    sut = new EditPlantUseCase(plantsRepository);
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
