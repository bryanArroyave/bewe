import { AddAddonToClientUsecase } from "../../../../Contexts/Backoffice/Account/application/addAddonToClient.usecase";
import { AddClientUsecase } from "../../../../Contexts/Backoffice/Account/application/addClient.usecase";
import { CreateAccountUsecase } from "../../../../Contexts/Backoffice/Account/application/createAccount.usecase";
import { AddAddonToClientController } from "../controllers/account/AddAddonToClientController";
import { AddClientController } from "../controllers/account/AddClientController";
import { CreateAccountController } from "../controllers/account/CreateAccountController";
function getCreateAccountController(repository) {
    return new CreateAccountController(new CreateAccountUsecase(repository));
}
function getAddClientController(repository) {
    return new AddClientController(new AddClientUsecase(repository));
}
function getAddAddonToClientController(repository) {
    return new AddAddonToClientController(new AddAddonToClientUsecase(repository));
}
export { getCreateAccountController, getAddClientController, getAddAddonToClientController, };
