import { makeCreateUser } from "@/test/factories/make-create-user";
import { RegisterNewPlantUseCase } from "./register-new-plant";

import { Plant } from "@/domain/enterprise/entities/plant";
import { InMemoryPlantsRepository } from "@/test/repositories/in-memory/in-memory-plants-repository";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory/in-memory-users-repository";
import { randomUUID } from "node:crypto";
import { UserNotFoundError } from "./errors/user-not-found.error";

let plantsRepository: InMemoryPlantsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: RegisterNewPlantUseCase;

describe("Register New Plant Use Case", () => {
  beforeEach(() => {
    plantsRepository = new InMemoryPlantsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterNewPlantUseCase(plantsRepository, usersRepository);
  });

  it("should be able register new plant", async () => {
    const user = makeCreateUser({
      name: "Jhon",
    });
    usersRepository.items.push(user);

    const { plant } = await sut.execute({
      name: "violetinha",
      age: 2.0,
      kind: "violet",
      serial: randomUUID(),
      userId: user.id.toString(),
    });

    expect(plant).toBeInstanceOf(Plant);
    expect(plant.name).toEqual("violetinha");
    //TODO: review this is necessary => expect(plant.owner.name).toEqual("Jhon");
    //TODO: review this is necessary =>  expect(plant.owner.plants[0].id).toEqual(plant.id);
    expect(user.plants.length).toBe(1);
  });

  it("should not be able register new plant with a nonexisting owner", async () => {
    await expect(() =>
      sut.execute({
        name: "violetinha",
        age: 2.0,
        kind: "violet",
        serial: randomUUID(),
        userId: "fake-owner-id",
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
