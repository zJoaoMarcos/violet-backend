import { Entity } from "../../../core/entities/entity";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";

export interface PlantProps {
  name: string;
  kind: string;
  age: number;
  serial: string;
  ownerId: string;
  updatedAt?: Date | null;
}

export class Plant extends Entity<PlantProps> {
  static create(props: PlantProps, id?: UniqueEntityID) {
    const plant = new Plant(
      {
        ...props,
      },
      id
    );

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

  get ownerId() {
    return this.props.ownerId;
  }

  set ownerId(owner: string) {
    this.props.ownerId = owner;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
