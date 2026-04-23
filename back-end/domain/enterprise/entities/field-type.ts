import { AggregateRoot } from "@/back-end/core/entities/aggregate-root"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"

interface FieldTypeProps {
    name: string
    createdAt: Date
    updatedAt: Date
}

// talvez eu nao use
export class FieldType extends AggregateRoot<FieldTypeProps> {

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: FieldTypeProps,
    id?: UniqueEntityId,
  ) {
    const field = new FieldType(
      {
        ...props,
      },
      id,
    )

    return field
  }
}
