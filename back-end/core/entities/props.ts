
export abstract class Props<T> {
  abstract validate(props: T): void
}