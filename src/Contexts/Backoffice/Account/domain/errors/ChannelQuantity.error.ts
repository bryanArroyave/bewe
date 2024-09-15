import { CustomError } from "../../../Shared/errors/Custom.error";

export class ChannelQuantityError extends CustomError {
  constructor(channel: string) {
    super(`Channel ${channel} has not messages available`);
  }
}
