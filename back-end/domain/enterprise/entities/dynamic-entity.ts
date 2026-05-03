import { AggregateRoot } from "@/back-end/core/entities/aggregate-root"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"
import { Item } from "./item"

// export class DynamicEntity {
//   id: string

//   entityName: string

//   values: Record<string, unknown>
// }

interface DynamicEntityProps {
  items: Item[]
  entityDefinitionId: UniqueEntityId

  createdAt: Date
  updatedAt: Date
}

export class DynamicEntity extends AggregateRoot<DynamicEntityProps> {

  get items() {
    return this.props.items
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: DynamicEntityProps,
    id?: UniqueEntityId,
  ) {
    const dynamicEntity = new DynamicEntity(
      {
        ...props,
      },
      id,
    )

    return dynamicEntity
  }
}
