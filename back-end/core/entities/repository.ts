import { AggregateRoot } from '@/core/entities/aggregate-root'

export abstract class Repository<
  TProps,
  TAggregate extends AggregateRoot<TProps>
> {
  abstract findById(id: string): Promise<TAggregate | null>

  abstract fetchAll(filters?: any): Promise<TAggregate[]>

  abstract create(entity: TAggregate): Promise<void>

  abstract save(entity: TAggregate): Promise<void>

  abstract delete(id: string): Promise<void>
}