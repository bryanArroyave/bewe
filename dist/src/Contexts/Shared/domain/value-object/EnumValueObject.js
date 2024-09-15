export class EnumValueObject {
    constructor(value, validValues) {
        this.validValues = validValues;
        console.log("value", value);
        console.log("validValues", validValues);
        this.value = value;
        this.checkValueIsValid(value);
    }
    checkValueIsValid(value) {
        if (!this.validValues.includes(value)) {
            this.throwErrorForInvalidValue(value);
        }
    }
}
