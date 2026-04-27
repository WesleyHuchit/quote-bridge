import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id";
import { ValueObject } from "@/back-end/core/entities/value-objects";
import { FieldType, FilledBy } from "../field";

export interface FieldReferenceProps {
  id: UniqueEntityId;
  name: string
  type: FieldType
  lineId: UniqueEntityId
  filledBy: FilledBy
  createdAt: Date
  updatedAt: Date
}

export class FieldReference extends ValueObject<FieldReferenceProps> {
  get id(): UniqueEntityId {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get type() {
    return this.props.type;
  }

  get lineId() {
    return this.props.lineId;
  }

  get filledBy() {
    return this.props.filledBy;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: FieldReferenceProps,
  ) {
    const fieldReference = new FieldReference(props);

    return fieldReference;
  }
}
