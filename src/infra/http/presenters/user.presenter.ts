import { User } from "@/domain/enterprise/entities/user";

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
