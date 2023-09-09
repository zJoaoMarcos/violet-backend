import { MakeRegisterNewUserUseCase } from "@/infra/factories/make-register-new-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, surname, email, password } = registerBodySchema.parse(
    request.body
  );

  try {
    const registerNewUserUseCase = MakeRegisterNewUserUseCase();

    await registerNewUserUseCase.execute({
      name,
      surname,
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
}
