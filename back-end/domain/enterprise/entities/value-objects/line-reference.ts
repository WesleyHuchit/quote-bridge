import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id";
import { ValueObject } from "@/back-end/core/entities/value-objects";

export interface LineReferenceProps {
  id: UniqueEntityId;
  name: string
  fieldIds: UniqueEntityId

  createdAt: Date
  updatedAt: Date
}

export class LineReference extends ValueObject<LineReferenceProps> {
  get id(): UniqueEntityId {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get fieldIds() {
    return this.props.fieldIds;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: LineReferenceProps,
  ) {
    const lineReference = new LineReference(props);

    return lineReference;
  }
}
