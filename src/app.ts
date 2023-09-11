import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { plantsRoutes } from "./infra/http/controllers/plants/routes";
import { usersRoutes } from "./infra/http/controllers/users/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: { expiresIn: "10m" },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(plantsRoutes, { prefix: "plants/" });
