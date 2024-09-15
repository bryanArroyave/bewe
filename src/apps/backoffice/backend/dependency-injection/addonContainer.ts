import { CreateAddonUsecase } from "../../../../Contexts/Backoffice/Addon/application/createAddon.usecase";
import { IAddonRepository } from "../../../../Contexts/Backoffice/Addon/domain/AddonRepository";
import { AddonRepository } from "../../../../Contexts/Backoffice/Addon/infrastructure/persistence/addon.repository";
import { CreateAddonController } from "../controllers/addon/CreateAddonController";

function getCreateAddonController(): CreateAddonController {
  const repository: IAddonRepository = new AddonRepository();
  return new CreateAddonController(new CreateAddonUsecase(repository));
}

export { getCreateAddonController as getCreateAddoonController };
