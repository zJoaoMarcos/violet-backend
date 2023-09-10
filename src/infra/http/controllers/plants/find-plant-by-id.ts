import { PlantNotFoundError } from "@/domain/application/use-cases/errors/plant-not-found.error";
import { MakeFindPlantByIdUseCase } from "@/infra/factories/make-find-plant-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PlantPresenter } from "../../presenters/plant.presenter";

export async function findPlantById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const findPlantByIdSchema = z.object({
    plantId: z.string(),
  });

  const { plantId } = findPlantByIdSchema.parse(request.params);

  try {
    const findPlantByIdUseCase = MakeFindPlantByIdUseCase();

    const { plant } = await findPlantByIdUseCase.execute({
      id: plantId,
    });

    return reply.status(200).send(PlantPresenter.toHTTP(plant));
  } catch (err) {
    if (err instanceof PlantNotFoundError) {
      return reply.status(404).send();
    }

    return reply.status(500).send();
  }
}
