import { Entity } from "@/back-end/core/entities/entity"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"

interface ItemProps {
    data: string
    fieldId: UniqueEntityId

    createdAt: Date
    updatedAt: Date
}

export class Item extends Entity<ItemProps> {

  get data() {
    return this.props.data
  }

  get fieldId() {
    return this.props.fieldId
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
