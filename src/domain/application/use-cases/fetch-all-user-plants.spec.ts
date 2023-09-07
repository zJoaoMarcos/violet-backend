import { Plant } from "@/domain/enterprise/entities/plant";
import { InMemoryPlantsRepository } from "@/infra/repositories/in-memory/in-memory-plants-repository";
import { InMemoryUsersRepository } from "@/infra/repositories/in-memory/in-memory-users-repository";
import { makeCreateUser } from "./factories/make-create-user";
import { makeRegisterPlant } from "./factories/make-register-plant";
import { FetchAllUserPlantsUseCase } from "./fetch-all-user-plants";

let plantsRepository: InMemoryPlantsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: FetchAllUserPlantsUseCase;

describe("Fetch All User Plants", () => {
  beforeEach(() => {
    plantsRepository = new InMemoryPlantsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new FetchAllUserPlantsUseCase(plantsRepository, usersRepository);
  });

  it("should be able fetch all user plants", async () => {
    const plant = makeRegisterPlant({ name: "violetinha" });
    const plant1 = makeRegisterPlant({ name: "rose" });
    const user = makeCreateUser({
      plants: [plant, plant1],
    });
    plant.owner = user;
    plant1.owner = user;
    plantsRepository.items.push(plant, plant1);
    usersRepository.items.push(user);

    const { plants } = await sut.execute({ userId: user.id.toString() });

    expect(plants.length).toBe(2);
    expect(plants[0].name).toEqual("violetinha");
    expect(plants[0]).toBeInstanceOf(Plant);
  });
});
