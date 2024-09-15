var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Addon } from "../domain/Addon";
import { AddonName } from "../domain/valueObjects/AddonName";
import { AddonDuplicatedError } from "../domain/errors/addonDuplicated.error";
export class CreateAddonUsecase {
    constructor(addonRepository) {
        this.addonRepository = addonRepository;
    }
    createAddon(addonDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const addon = new Addon(null, new AddonName(addonDto.name, AddonName.ADDON_NAMES));
            try {
                const id = yield this.addonRepository.save(addon);
                return id;
            }
            catch (err) {
                if (err.message.includes("duplicate key value violates unique constraint")) {
                    throw new AddonDuplicatedError();
                }
                throw err;
            }
        });
    }
}
