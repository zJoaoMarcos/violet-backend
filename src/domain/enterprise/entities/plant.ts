import { Entity } from "../../../core/entities/entity";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { User } from "./user";

export interface PlantProps {
  name: string;
  kind: string;
  age: number;
  serial: string;
  owner: User;
}

export class Plant extends Entity<PlantProps> {
  static create(props: PlantProps, id?: UniqueEntityID) {
    const plant = new Plant({
      ...props,
    });

    return plant;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get kind() {
    return this.props.kind;
  }

  set kind(kind: string) {
    this.props.kind = kind;
  }

  get age() {
    return this.props.age;
  }

  set age(age: number) {
    this.props.age = age;
  }

  get serial() {
    return this.props.serial;
  }

  set serial(serial: string) {
    this.props.serial = serial;
  }

  get owner() {
    return this.props.owner;
  }
}
