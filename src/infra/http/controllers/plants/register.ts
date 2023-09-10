import { UserNotFoundError } from "@/domain/application/use-cases/errors/user-not-found.error";
import { MakeRegisterPlantUseCase } from "@/infra/factories/make-register-plant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    kind: z.string(),
    age: z.number(),
    serial: z.string(),
    ownerId: z.string(),
  });

  const { name, kind, age, serial, ownerId } = registerBodySchema.parse(
    request.params
  );

  try {
    const registerPlantUseCase = MakeRegisterPlantUseCase();

    await registerPlantUseCase.execute({
      name,
      kind,
      age,
      serial,
      userId: ownerId,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
