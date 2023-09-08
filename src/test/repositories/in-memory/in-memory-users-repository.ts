import { IUserRepository } from "@/domain/application/repositories/user.repository";
import { User } from "@/domain/enterprise/entities/user";

export class InMemoryUsersRepository implements IUserRepository {
  items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findById(id: string): Promise<User> {
    const user = this.items.find((user) => user.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: User): Promise<void> {
    const index = this.items.findIndex((item) => item.equals(user));

    this.items[index] = user;
  }
}
