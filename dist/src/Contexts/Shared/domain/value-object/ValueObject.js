import { InvalidArgumentError } from './InvalidArgumentError';
export class ValueObject {
    constructor(value) {
        this.value = value;
        this.ensureValueIsDefined(value);
    }
    ensureValueIsDefined(value) {
        if (value === null || value === undefined) {
            throw new InvalidArgumentError('Value must be defined');
        }
    }
    equals(other) {
        return other.constructor.name === this.constructor.name && other.value === this.value;
    }
    toString() {
        return this.value.toString();
    }
}
