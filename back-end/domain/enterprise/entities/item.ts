import { AggregateRoot } from "@/back-end/core/entities/aggregate-root"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"
import { LineReference } from "./value-objects/line-reference"
import { FieldReference } from "./value-objects/field-reference"

interface ItemProps {
    data: string
    field: FieldReference
    line: LineReference

    createdAt: Date
    updatedAt: Date
}

export class Item extends AggregateRoot<ItemProps> {

  get data() {
    return this.props.data
  }

  get field() {
    return this.props.field
  }

  get line() {
    return this.props.line
  }
 
  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: ItemProps,
    id?: UniqueEntityId,
  ) {
    const item = new Item(
      {
        ...props,
      },
      id,
    )

    return item
  }
}
