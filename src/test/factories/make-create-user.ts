import { User, UserProps } from "@/domain/enterprise/entities/user";
import { faker } from "@faker-js/faker";

export function makeCreateUser(override: Partial<UserProps> = {}) {
  const user = User.create({
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    plants: [],
    ...override,
  });

  return user;
}
