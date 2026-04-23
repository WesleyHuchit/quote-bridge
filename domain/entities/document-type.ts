import { ValueObject } from "./value-objects";

export enum DocumentTypeEnum {
  CILIA = 'CILIA',
  WEB_SOMA = 'WEB_SOMA',
  HDI = 'HDI',
  OTHER = 'OTHER',
}

interface DocumentTypeProps {
  value: DocumentTypeEnum;
}

export class DocumentType extends ValueObject<DocumentTypeProps> {
  get value(): DocumentTypeEnum {
    return this.props.value;
  }

  static create(value: DocumentTypeEnum): DocumentType {
    return new DocumentType({ value });
  }

}
