import { IUserRepository } from "../../../domain/application/repositories/user.repository";
import { User } from "../../../domain/enterprise/entities/user";

export class InMemoryUsersRepository implements IUserRepository {
  items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findById(id: string): Promise<User> {
    const plant = this.items.find((plant) => plant.id.toString() === id);

    if (!plant) {
      return null;
    }

    return plant;
  }

  async findByEmail(email: string): Promise<User> {
    const plant = this.items.find((plant) => plant.email === email);

    if (!plant) {
      return null;
    }

    return plant;
  }

  async save(user: User): Promise<void> {
    const index = this.items.findIndex((item) => item.equals(user));

    this.items[index] = user;
  }
}
