import CreateAddonDto from "../../domain/dtos/createAddon.dto";

export interface ICreateAddon {
	createAddon(addonData: CreateAddonDto): Promise<number>;
}
