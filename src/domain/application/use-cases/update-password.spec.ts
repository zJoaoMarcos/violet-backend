import { makeCreateUser } from "@/test/factories/make-create-user";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory/in-memory-users-repository";
import { UpdatePasswordUseCase } from "./update-password";

import * as bcrypt from "bcrypt";

let usersRepository: InMemoryUsersRepository;
let sut: UpdatePasswordUseCase;

describe("Update Password Use Case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdatePasswordUseCase(usersRepository);
  });

  it("should be able to update user password", async () => {
    usersRepository.items.push(
      makeCreateUser({
        email: "jhon.doe@example.com",
        password: await bcrypt.hash("fake-passwd", 10),
      })
    );

    const { user } = await sut.execute({
      email: "jhon.doe@example.com",
      currentPassword: "fake-passwd",
      newPassword: "fake-new-passwd",
    });

    expect(user.password).toBe(undefined);
  });
});
