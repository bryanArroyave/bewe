import { ValueObject } from './ValueObject';
export class NullableValueObject extends ValueObject {
    exists() {
        return this.value !== null && this.value !== undefined;
    }
}
