import { AggregateRoot } from "@/back-end/core/entities/aggregate-root"
import { UniqueEntityId } from "@/back-end/core/entities/unique-entity-id"
import { Item } from "./item"

interface QuoteProps {
    items: Item[]

    createdAt: Date
    updatedAt: Date
}

export class Quote extends AggregateRoot<QuoteProps> {

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
    props: QuoteProps,
    id?: UniqueEntityId,
  ) {
    const quote = new Quote(
      {
        ...props,
      },
      id,
    )

    return quote
  }
}
