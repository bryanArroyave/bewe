import { ValueObject } from "./ValueObject";
export class DateValueObject extends ValueObject {
    isBiggerThan(other) {
        return this.value > other.value;
    }
}
