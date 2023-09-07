import { Plant } from "@/domain/enterprise/entities/plant";
import { InMemoryPlantsRepository } from "@/infra/repositories/in-memory/in-memory-plants-repository";
import { makeRegisterPlant } from "./factories/make-register-plant";
import { FindPlantByIdUseCase } from "./find-plant-by-id";

let plantsRepository: InMemoryPlantsRepository;
let sut: FindPlantByIdUseCase;

describe("Find Plant By Id", () => {
  beforeEach(() => {
    plantsRepository = new InMemoryPlantsRepository();
    sut = new FindPlantByIdUseCase(plantsRepository);
  });

  it("should be able to find a plant by id", async () => {
    const plant = makeRegisterPlant({
      name: "violetinha",
      age: 2,
      kind: "violet",
    });
    plantsRepository.items.push(
      plant,
      makeRegisterPlant(),
      makeRegisterPlant()
    );

    const { plant: plantSearched } = await sut.execute({
      id: plant.id.toString(),
    });

    expect(plant).toBeInstanceOf(Plant);
    expect(plantSearched.name).toEqual("violetinha");
    expect(plantSearched.age).toBe(2);
  });
});
