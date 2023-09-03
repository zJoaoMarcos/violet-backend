import { faker } from "@faker-js/faker";

import { User, UserProps } from "../../../enterprise/entities/user";

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
