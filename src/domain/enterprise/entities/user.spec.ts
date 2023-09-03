import { User } from "./user";

test("User Entity", () => {
  const user = User.create({
    name: "Jhon",
    surname: "Doe",
    email: "jhon.doe@example.com",
    password: "123456",
    plants: [],
  });

  expect(user).toBeInstanceOf(User);
  expect(user.surname).toEqual("Doe");
});
