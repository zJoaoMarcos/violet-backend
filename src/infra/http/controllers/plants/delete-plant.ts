import { NotAllowedError } from "@/domain/application/use-cases/errors/not-allowed.error";
import { PlantNotFoundError } from "@/domain/application/use-cases/errors/plant-not-found.error";
import { makeDeletePlantUseCase } from "@/infra/factories/make-delete-plant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePlant(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deletePlantParamsSchema = z.object({
    plantId: z.string(),
    ownerId: z.string(),
  });

  const { plantId, ownerId } = deletePlantParamsSchema.parse(request.params);

  try {
    const deletePlantUseCase = makeDeletePlantUseCase();

    await deletePlantUseCase.execute({
      plantId,
      ownerId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof PlantNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof NotAllowedError) {
      return reply.status(405).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
