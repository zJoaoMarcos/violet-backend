import { MakeGetUserProfileUseCase } from "@/infra/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserPresenter } from "../../presenters/user.presenter";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = MakeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({ userId: request.user.sub });

  return reply.status(200).send(UserPresenter.toHTTP(user));
}
