import { ValueObject } from './ValueObject';

export abstract class NullableValueObject extends ValueObject<string> {
  exists(): boolean {
    return this.value !== null && this.value !== undefined;
  }
}
