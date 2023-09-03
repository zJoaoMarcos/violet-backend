import { Plant } from "./plant";

test("User Entity", () => {
  const plant = Plant.create({
    name: "violetinha",
    age: 2,
    kind: "violet",
    serial: "fake-serial",
  });

  expect(plant).toBeInstanceOf(Plant);
  expect(plant.name).toEqual("violetinha");
});
