import { EmailOrPasswordIncorretError } from "@/domain/application/use-cases/errors/email-or-password-incorret.error";
import { MakeSignInUseCase } from "@/infra/factories/make-sign-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = signInBodySchema.parse(request.body);

  try {
    const signInUseCase = MakeSignInUseCase();

    const { user } = await signInUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id.toString(),
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id.toString(),
          expiresIn: "15d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof EmailOrPasswordIncorretError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
