import { PlantNotFoundError } from "@/domain/application/use-cases/errors/plant-not-found.error";
import { MakeEditPlantUseCase } from "@/infra/factories/make-edit-plant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editPlant(request: FastifyRequest, reply: FastifyReply) {
  const editPlantParamsSchema = z.object({
    plantId: z.string(),
  });
  const editPlantBodySchema = z.object({
    name: z.string(),
    kind: z.string(),
    age: z.coerce.number(),
  });

  const { plantId } = editPlantParamsSchema.parse(request.params);
  const { name, kind, age } = editPlantBodySchema.parse(request.body);

  try {
    const editPlantUseCase = MakeEditPlantUseCase();

    await editPlantUseCase.execute({ plantId, age, kind, name });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof PlantNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
