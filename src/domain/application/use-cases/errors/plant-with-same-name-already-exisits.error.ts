export class PlantWithSameNameAlreadyExistsError extends Error {
  constructor() {
    super("Plant with same name already exists");
  }
}
