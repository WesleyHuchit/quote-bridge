import { AggregateRoot } from "@/back-end/core/entities/aggregate-root"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"

export enum FieldType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  DATE = "DATE",
}

export enum FilledBy {
  BUYER = "BUYER",
  SUPPLIER = "SUPPLIER"
}

interface FieldDefinitionProps {
  name: string
  type: FieldType
  lineId: UniqueEntityId
  filledBy: FilledBy
  createdAt: Date
  updatedAt: Date
}

export class FieldDefinition extends AggregateRoot<FieldDefinitionProps> {

  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
  }

  get lineId() {
    return this.props.lineId
  }

  get filledBy() {
    return this.props.filledBy
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: FieldDefinitionProps,
    id?: UniqueEntityId,
  ) {
    const field = new FieldDefinition(
      {
        ...props,
      },
      id,
    )

    return field
  }
}
