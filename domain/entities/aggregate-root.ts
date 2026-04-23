import { DomainEvents } from '@/core/events/domain-events'
import { DomainEvent } from '../events/domain-event'
import { Entity } from './entity'
import { DraftState } from './draft-state'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []
  protected _status: DraftState = DraftState.DRAFT

  get status(): DraftState {
    return this._status
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }

  protected setStatus(status: DraftState): void {
    this._status = status
    // Opcional: disparar evento de mudança de status aqui
  }

}
