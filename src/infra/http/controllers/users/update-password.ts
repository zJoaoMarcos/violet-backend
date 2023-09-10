import { EmailOrPasswordIncorretError } from "@/domain/application/use-cases/errors/email-or-password-incorret.error";
import { MakeUpdatePasswordUseCase } from "@/infra/factories/make-update-password-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updatePassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updatePasswordBodySchema = z.object({
    email: z.string().email(),
    currentPassword: z.string(),
    newPassword: z.string(),
  });

  const { email, currentPassword, newPassword } =
    updatePasswordBodySchema.parse(request.body);

  try {
    const updatePasswordUseCase = MakeUpdatePasswordUseCase();

    await updatePasswordUseCase.execute({
      email,
      currentPassword,
      newPassword,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof EmailOrPasswordIncorretError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
