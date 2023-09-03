import { UniqueEntityID } from "./unique-entity-id";

export class Entity<Props> {
  public _id: UniqueEntityID;
  public _createdAt: Date;
  public props: Props;

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  protected constructor(props: Props, id?: UniqueEntityID, createdAt?: Date) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
    this._createdAt = createdAt ?? new Date();
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
