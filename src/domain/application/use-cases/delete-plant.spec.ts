import { makeRegisterPlant } from "@/test/factories/make-register-plant";
import { InMemoryPlantsRepository } from "@/test/repositories/in-memory/in-memory-plants-repository";
import { DeletePlantUseCase } from "./delete-plant";
import { NotAllowedError } from "./errors/not-allowed.error";

let plantsRepository: InMemoryPlantsRepository;
let sut: DeletePlantUseCase;

describe("Delete Plant Use Case", () => {
  beforeEach(() => {
    plantsRepository = new InMemoryPlantsRepository();
    sut = new DeletePlantUseCase(plantsRepository);
  });

  it("should be able to delete plant", async () => {
    const plant = makeRegisterPlant({ name: "violetinha", ownerId: "Jhon" });
    plantsRepository.items.push(plant);

    await sut.execute({ plantId: plant.id.toString(), ownerId: "Jhon" });

    expect(plantsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete plant with an incorrect ownerId", async () => {
    const plant = makeRegisterPlant({
      name: "violetinha",
      ownerId: "owner-id",
    });
    plantsRepository.items.push(plant);

    await expect(() =>
      sut.execute({
        plantId: plant.id.toString(),
        ownerId: "incorrect-ownerId",
      })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });
});
