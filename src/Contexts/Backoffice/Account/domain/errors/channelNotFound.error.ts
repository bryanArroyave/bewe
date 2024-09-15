import { NotFound } from "../../../Shared/errors/NotFound.error";
import { Channel } from "../valueObjects/Channel";

export class ChannelNotFoundError extends NotFound {
    constructor(channel: string) {
        super(`Channel ${channel} not allowed, please use one of the following: ${Channel.TYPES.join(', ')}`);
    }

}
