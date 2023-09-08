import { makeCreateUser } from "@/test/factories/make-create-user";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory/in-memory-users-repository";
import { EditUserUseCase } from "./edit-user";
import { EmailAlreadyRegisteredError } from "./errors/email-already-registered.error";

let usersRepository: InMemoryUsersRepository;
let sut: EditUserUseCase;

describe("Edit User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new EditUserUseCase(usersRepository);
  });

  it("should be able edit an user", async () => {
    const user = makeCreateUser({ email: "jhondoe@example.com" });
    usersRepository.items.push(user);

    const { user: updatedUser } = await sut.execute({
      userId: user.id.toString(),
      name: "Jana",
      surname: "Doe",
      email: "jana.doe@email.com",
    });

    expect(updatedUser.name).toEqual("Jana");
  });

  it("should not be able edit new user with same email address", async () => {
    const user = makeCreateUser({ email: "janadoe@example.com" });
    usersRepository.items.push(
      user,
      makeCreateUser({ email: "jhondoe@example.com" })
    );

    await expect(() =>
      sut.execute({
        userId: user.id.toString(),
        name: "Jhon",
        surname: "Doe",
        email: "jhondoe@example.com",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError);
  });
});
