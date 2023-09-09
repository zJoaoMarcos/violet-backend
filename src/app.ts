import fastify from "fastify";
import { plantsRoutes } from "./infra/http/controllers/plants/routes";
import { usersRoutes } from "./infra/http/controllers/users/routes";

export const app = fastify();

app.register(usersRoutes);
app.register(plantsRoutes);
