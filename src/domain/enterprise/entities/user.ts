import { Entity } from "../../../core/entities/entity";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { Plant } from "./plant";

export interface UserProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  plants: Plant[] | [];
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User({
      ...props,
    });

    return user;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get surname() {
    return this.props.surname;
  }

  set surname(surname: string) {
    this.props.surname = surname;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get plants() {
    return this.props.plants;
  }

  set plants(plants: Plant[]) {
    this.props.plants = plants;
  }
}
