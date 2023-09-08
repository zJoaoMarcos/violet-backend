import { makeCreateUser } from "@/test/factories/make-create-user";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory/in-memory-users-repository";
import { SignInUseCase } from "./sign-in";

import * as bcrypt from "bcrypt";

let usersRepository: InMemoryUsersRepository;
let sut: SignInUseCase;

describe("Sign In Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new SignInUseCase(usersRepository);
  });

  it("should be able to sign in application", async () => {
    usersRepository.items.push(
      makeCreateUser({
        email: "jhon.doe@example.com",
        name: "Jhon",
        surname: "Doe",
        password: await bcrypt.hash("fake-passwd", 10),
      })
    );

    const { user } = await sut.execute({
      email: "jhon.doe@example.com",
      password: "fake-passwd",
    });

    expect(user.name).toEqual("Jhon");
    expect(user.password).toBe(undefined);
  });
});
