import { IUserRepository } from "@/domain/application/repositories/user.repository";
import { User } from "@/domain/enterprise/entities/user";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";
import { PrismaService } from "../prisma";

export class PrismaUsersRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.id.toString(),
        name: user.name,
        surname: user.surname,
        passsword: user.password,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { plants: true },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user, user.plants);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { plants: true },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user, user.plants);
  }

  save(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
