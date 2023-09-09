import { PlantNotFoundError } from "@/domain/application/use-cases/errors/plant-not-found.error";
import { UserNotFoundError } from "@/domain/application/use-cases/errors/user-not-found.error";
import { MakeFetchAllUserPlantsUseCase } from "@/infra/factories/make-fetch-all-user-plants-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PlantPresenter } from "../../presenters/plant.presenter";

export async function fetchAllUserPlants(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchAllUserPlantsSchema = z.object({
    ownerId: z.string(),
  });

  const { ownerId } = fetchAllUserPlantsSchema.parse(request.params);

  try {
    const makeFetchAllUserPlantsUseCase = MakeFetchAllUserPlantsUseCase();

    const { plants } = await makeFetchAllUserPlantsUseCase.execute({
      userId: ownerId,
    });

    return reply
      .status(200)
      .send({ plants: plants.map(PlantPresenter.toHTTP) });
  } catch (err) {
    if (err instanceof PlantNotFoundError || err instanceof UserNotFoundError) {
      return reply.status(404).send();
    }

    return reply.status(500).send();
  }
}
