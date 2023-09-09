import { FastifyInstance } from "fastify";
import { fetchAllUserPlants } from "./fetch-all-user-plants";

export async function plantsRoutes(app: FastifyInstance) {
  app.get("/plants/:ownerId", fetchAllUserPlants);
}
