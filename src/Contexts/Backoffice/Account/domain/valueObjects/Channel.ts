import { EnumValueObject } from "../../../../Shared/domain/value-object/EnumValueObject";
import { ChannelNotFoundError } from "../errors/channelNotFound.error";

export class Channel extends EnumValueObject<string> {
  static readonly TYPES = ["sms", "whatsapp", "email"];

  protected throwErrorForInvalidValue(value: string): void {
    throw new ChannelNotFoundError(value);
  }
}
