import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { profile } from "./profile";
import { refresh } from "./refresh";
import { register } from "./register";
import { signIn } from "./sign-in";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/auth", signIn);

  app.patch("/token/refresh", refresh);

  // Authenticated
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
