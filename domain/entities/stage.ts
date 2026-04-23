export enum StageEnum {
  PERSISTED = "PERSISTED",
  NOT_PERSISTED = "NOT_PERSISTED",
}

export class Stage {
  private value: StageEnum;

  toValue() {
    return this.value;
  }

  constructor(value: StageEnum) {
    this.value = value;
  }

  static createNotPersisted() {
    const stage = new Stage(StageEnum.NOT_PERSISTED);
    return stage;
  }

  static createPersisted() {
    const stage = new Stage(StageEnum.PERSISTED);
    return stage;
  }

}
