import { Plant, PlantProps } from "@/domain/enterprise/entities/plant";
import { faker } from "@faker-js/faker";
import { makeCreateUser } from "./make-create-user";

export function makeRegisterPlant(override: Partial<PlantProps> = {}) {
  const user = Plant.create({
    name: faker.person.firstName(),
    age: faker.number.int(),
    kind: faker.person.gender(),
    owner: makeCreateUser(),
    serial: faker.datatype.uuid(),
    ...override,
  });

  return user;
}
