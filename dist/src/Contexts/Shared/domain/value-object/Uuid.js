import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate';
import { InvalidArgumentError } from './InvalidArgumentError';
import { ValueObject } from './ValueObject';
export class Uuid extends ValueObject {
    constructor(value) {
        super(value);
        this.ensureIsValidUuid(value);
    }
    static random() {
        return new Uuid(uuid());
    }
    ensureIsValidUuid(id) {
        if (!validate(id)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
        }
    }
}
