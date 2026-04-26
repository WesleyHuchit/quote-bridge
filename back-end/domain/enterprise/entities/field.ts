import { AggregateRoot } from "@/back-end/core/entities/aggregate-root"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"

enum FieldType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  DATE = "DATE",
}

enum FilledBy {
  BUYER = "BUYER",
  SUPPLIER = "SUPPLIER"
}

interface FieldProps {
  name: string
  type: FieldType
  lineId: UniqueEntityId
  filledBy: FilledBy
  createdAt: Date
  updatedAt: Date
}

export class Field extends AggregateRoot<FieldProps> {

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
    props: FieldProps,
    id?: UniqueEntityId,
  ) {
    const field = new Field(
      {
        ...props,
      },
      id,
    )

    return field
  }
}
