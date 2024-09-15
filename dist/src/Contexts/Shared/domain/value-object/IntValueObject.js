import { ValueObject } from './ValueObject';
export class NumberValueObject extends ValueObject {
    isBiggerThan(other) {
        return this.value > other.value;
    }
}
