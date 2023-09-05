import { InMemoryUsersRepository } from "@/infra/repositories/in-memory/in-memory-users-repository";

import { User } from "@/domain/enterprise/entities/user";
import { EmailAlreadyRegisteredError } from "./errors/email-already-registered.error";
import { makeCreateUser } from "./factories/make-create-user";
import { RegisterNewUserUseCase } from "./register-new-user";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterNewUserUseCase;

describe("Register New User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterNewUserUseCase(usersRepository);
  });

  it("should be able register new user", async () => {
    const { user } = await sut.execute({
      name: "Jhon",
      surname: "Doe",
      email: "jhondoe@email.com",
      password: "fake-password",
    });

    expect(user).toBeInstanceOf(User);
    expect(user.name).toEqual("Jhon");
    expect(user.plants.length).toBe(0);
    expect(user.password).toBe(undefined);
  });

  it("should not be able register new user with same email address", async () => {
    usersRepository.items.push(makeCreateUser({ email: "jhondoe@email.com" }));

    await expect(() =>
      sut.execute({
        name: "Jhon",
        surname: "Doe",
        email: "jhondoe@email.com",
        password: "fake-password",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError);
  });
});
