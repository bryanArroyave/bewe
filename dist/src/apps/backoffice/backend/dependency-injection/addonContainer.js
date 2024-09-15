import { CreateAddonUsecase } from "../../../../Contexts/Backoffice/Addon/application/createAddon.usecase";
import { AddonRepository } from "../../../../Contexts/Backoffice/Addon/infrastructure/persistence/addon.repository";
import { CreateAddonController } from "../controllers/addon/CreateAddonController";
function getCreateAddonController() {
    const repository = new AddonRepository();
    return new CreateAddonController(new CreateAddonUsecase(repository));
}
export { getCreateAddonController as getCreateAddoonController };
