import { UniqueEntityId } from "./unique-entity-id";

export class PreviousServiceOrderItem {
    private readonly value: 'notDefined' | 'noPreviousItem' | UniqueEntityId

    static createNotDefined() {
        return new PreviousServiceOrderItem('notDefined');
    }

    static createByPrisma(value: string | null | undefined) {
        if (!value) {
            return new PreviousServiceOrderItem('noPreviousItem');
        }
        return new PreviousServiceOrderItem(new UniqueEntityId(value));
    }

    private constructor(value: 'notDefined' | 'noPreviousItem' | UniqueEntityId) {
        this.value = value;
    }

    toPrismaId(): string {
        if (this.value === 'notDefined') {
            throw new Error('Cannot convert to Prisma ID');
        }
        return this.value.toString();
    }

}