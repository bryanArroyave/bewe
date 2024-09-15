import { AddAddonToClientUsecase } from "../../../../Contexts/Backoffice/Account/application/addAddonToClient.usecase";
import { AddClientUsecase } from "../../../../Contexts/Backoffice/Account/application/addClient.usecase";
import { CreateAccountUsecase } from "../../../../Contexts/Backoffice/Account/application/createAccount.usecase";
import { GetAddonsQuantityUsecase } from "../../../../Contexts/Backoffice/Account/application/getAddonsQuantity.usecase";
import { HandleAccountSubscriotionUsecase } from "../../../../Contexts/Backoffice/Account/application/handleAccountSubscription.usecase";
import { HandleClientSubscriotionUsecase } from "../../../../Contexts/Backoffice/Account/application/handleClientSubscription.usecase";
import { NotifyUsecase } from "../../../../Contexts/Backoffice/Account/application/notify.usecase";
import { IAccountRepository } from "../../../../Contexts/Backoffice/Account/domain/AccountRepository";
import { AddAddonToClientController } from "../controllers/account/AddAddonToClientController";
import { AddClientController } from "../controllers/account/AddClientController";
import { CreateAccountController } from "../controllers/account/CreateAccountController";
import { GetAddonsQuantityController } from "../controllers/account/GetAddonsQuantityController";
import { HandleAccountSubscriptionController } from "../controllers/account/HandleAccountSubscriptionController";
import { HandleClientSubscriptionController } from "../controllers/account/HandleClientSubscriptionController";
import { NotifyController } from "../controllers/account/NotifyController";

function getCreateAccountController(
  repository: IAccountRepository
): CreateAccountController {
  return new CreateAccountController(new CreateAccountUsecase(repository));
}

function getAddClientController(
  repository: IAccountRepository
): AddClientController {
  return new AddClientController(new AddClientUsecase(repository));
}

function getAddAddonToClientController(
  repository: IAccountRepository
): AddAddonToClientController {
  return new AddAddonToClientController(
    new AddAddonToClientUsecase(repository)
  );
}

function getHandleAccountSubscriptionController(
  repository: IAccountRepository
): HandleAccountSubscriptionController {
  return new HandleAccountSubscriptionController(
    new HandleAccountSubscriotionUsecase(repository)
  );
}
function getHandleClientSubscriptionController(
  repository: IAccountRepository
): HandleClientSubscriptionController {
  return new HandleClientSubscriptionController(
    new HandleClientSubscriotionUsecase(repository)
  );
}
function getGetAddonsQuantityController(
  repository: IAccountRepository
): GetAddonsQuantityController {
  return new GetAddonsQuantityController(
    new GetAddonsQuantityUsecase(repository)
  );
}
function getNotifyController(repository: IAccountRepository): NotifyController {
  return new NotifyController(new NotifyUsecase(repository));
}

export {
  getCreateAccountController,
  getAddClientController,
  getAddAddonToClientController,
  getHandleAccountSubscriptionController,
  getHandleClientSubscriptionController,
  getGetAddonsQuantityController,
  getNotifyController,
};
