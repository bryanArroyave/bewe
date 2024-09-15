import { ValueObject } from "./ValueObject";

export abstract class DateValueObject extends ValueObject<Date> {
    isBiggerThan(other: DateValueObject): boolean {
        return this.value > other.value;
    }
}