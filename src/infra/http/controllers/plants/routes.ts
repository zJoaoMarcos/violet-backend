import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-jwt";
import { deletePlant } from "./delete-plant";
import { editPlant } from "./edit-plant";
import { fetchAllUserPlants } from "./fetch-all-user-plants";
import { findPlantById } from "./find-plant-by-id";
import { register } from "./register";

export async function plantsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("", register);
  app.put(":plantId", editPlant);
  app.get("owner/:ownerId", fetchAllUserPlants);
  app.get(":plantId", findPlantById);
  app.delete(":plantId/owner/:ownerId", deletePlant);
}
