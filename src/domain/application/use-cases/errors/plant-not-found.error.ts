export class PlantNotFoundError extends Error {
  constructor() {
    super("Plant not found.");
  }
}
