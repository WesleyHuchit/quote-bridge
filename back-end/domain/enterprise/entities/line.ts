import { AggregateRoot } from "@/back-end/core/entities/aggregate-root"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"

interface LineProps {
    name: string
    fieldIds: UniqueEntityId

    createdAt: Date
    updatedAt: Date
}

export class Line extends AggregateRoot<LineProps> {

  get name() {
    return this.props.name
  }
  
  get fieldIds() {
    return this.props.fieldIds
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: LineProps,
    id?: UniqueEntityId,
  ) {
    const field = new Line(
      {
        ...props,
      },
      id,
    )

    return field
  }
}
