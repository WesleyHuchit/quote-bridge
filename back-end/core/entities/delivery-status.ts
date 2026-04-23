import {
  ValueObject
} from "@/core/entities/value-objects";
import {
  DeliveryStatus as PrismaDeliveryStatus,
} from "@prisma/client";

export enum DeliveryState {
  NOT_APPLICABLE = "NOT_APPLICABLE",
  PENDING = "PENDING",
  QUOTING = "QUOTING",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  DELIVERING = "DELIVERING",
  DELIVERED = "DELIVERED",
}

interface DeliveryStatusProps {
  state: DeliveryState;
  expectedDate: Date | null;
  arrivedAt: Date | null;
}

export class DeliveryStatus extends ValueObject<DeliveryStatusProps> {
  get state() {
    return this.props.state;
  }
  get expectedDate() {
    return this.props.expectedDate;
  }
  get arrivedAt() {
    return this.props.arrivedAt;
  }

  get toPrisma(): PrismaDeliveryStatus {
    switch (this.props.state) {
      case DeliveryState.NOT_APPLICABLE:
        return PrismaDeliveryStatus.NOT_APPLICABLE;

      case DeliveryState.PENDING:
        return PrismaDeliveryStatus.PENDING;

      case DeliveryState.QUOTING:
        return PrismaDeliveryStatus.QUOTING;

      case DeliveryState.DELIVERING:
        return PrismaDeliveryStatus.DELIVERING;

      case DeliveryState.DELIVERED:
        return PrismaDeliveryStatus.DELIVERED;

      case DeliveryState.PENDING_APPROVAL:
        return PrismaDeliveryStatus.PENDING_APPROVAL;

      case DeliveryState.APPROVED:
        return "APPROVED" as PrismaDeliveryStatus;

      default:
        throw new Error(`Invalid delivery state: ${this.props.state}`);
    }
  }

  // Helpers de Verificação
  isNotApplicable() {
    return this.props.state === DeliveryState.NOT_APPLICABLE;
  }
  isPending() {
    return this.props.state === DeliveryState.PENDING;
  }
  isPendingApproval() {
    return this.props.state === DeliveryState.PENDING_APPROVAL;
  }
  isApproved() {
    return this.props.state === DeliveryState.APPROVED;
  }
  isQuoting() {
    return this.props.state === DeliveryState.QUOTING;
  }
  isDelivering() {
    return this.props.state === DeliveryState.DELIVERING;
  }
  isDelivered() {
    return this.props.state === DeliveryState.DELIVERED;
  }

  static createNotApplicable() {
    return new DeliveryStatus({
      state: DeliveryState.NOT_APPLICABLE,
      expectedDate: null,
      arrivedAt: null,
    });
  }

  static createPending() {
    return new DeliveryStatus({
      state: DeliveryState.PENDING,
      expectedDate: null,
      arrivedAt: null,
    });
  }

  static createQuoting() {
    return new DeliveryStatus({
      state: DeliveryState.QUOTING,
      expectedDate: null,
      arrivedAt: null,
    });
  }

  static createDelivering(expectedDate: Date) {
    return new DeliveryStatus({
      state: DeliveryState.DELIVERING,
      expectedDate,
      arrivedAt: null,
    });
  }

  static createDelivered(arrivedAt: Date = new Date()) {
    return new DeliveryStatus({
      state: DeliveryState.DELIVERED,
      expectedDate: null,
      arrivedAt,
    });
  }

  static createPendingApproval() {
    return new DeliveryStatus({
      state: DeliveryState.PENDING_APPROVAL,
      expectedDate: null,
      arrivedAt: null,
    });
  }

  static createApproved() {
    return new DeliveryStatus({
      state: DeliveryState.APPROVED,
      expectedDate: null,
      arrivedAt: null,
    });
  }

  static create(
    state: string,
    expectedDate: Date | null,
    arrivedAt: Date | null
  ): DeliveryStatus {
    let deliveryState: DeliveryState;
    switch (state) {
      case "NOT_APPLICABLE":
        deliveryState = DeliveryState.NOT_APPLICABLE;
        break;
      case "PENDING":
        deliveryState = DeliveryState.PENDING;
        break;
      case "QUOTING":
        deliveryState = DeliveryState.QUOTING;
        break;
      case "DELIVERING":
        deliveryState = DeliveryState.DELIVERING;
        break;
      case "DELIVERED":
        deliveryState = DeliveryState.DELIVERED;
        break;
      case "PENDING_APPROVAL":
        deliveryState = DeliveryState.PENDING_APPROVAL;
        break;
      case "APPROVED":
        deliveryState = DeliveryState.APPROVED;
        break;
      default:
        throw new Error(`Invalid delivery state: ${state}`);
    }
    return new DeliveryStatus({
      state: deliveryState,
      expectedDate: expectedDate || null,
      arrivedAt: arrivedAt || null,
    });
  }
}
