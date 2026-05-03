import { AggregateRoot } from "@/back-end/core/entities/aggregate-root"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"

interface EntityDefinitionProps {
  name: string // Cotação de peça
  fieldDefinitionIds: UniqueEntityId[] // campos e seus tipos

  createdAt: Date
  updatedAt: Date
}

export class EntityDefinition extends AggregateRoot<EntityDefinitionProps> {

  get name() {
    return this.props.name
  }

  get fieldIds() {
    return this.props.fieldDefinitionIds
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: EntityDefinitionProps,
    id?: UniqueEntityId,
  ) {
    const dynamicEntity = new EntityDefinition(
      {
        ...props,
      },
      id,
    )

    return dynamicEntity
  }
}
