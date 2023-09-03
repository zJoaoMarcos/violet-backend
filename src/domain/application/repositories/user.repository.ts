import { User } from "../../enterprise/entities/user";

export interface IUserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
