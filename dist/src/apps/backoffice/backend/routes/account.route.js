import { getAddAddonToClientController, getAddClientController, getCreateAccountController, } from "../dependency-injection/accountContainer";
import { AccountRepository } from "../../../../Contexts/Backoffice/Account/infrastructure/persistence/account.repository";
export const register = (router) => {
    const repository = new AccountRepository();
    router.post("/account", (req, res) => {
        getCreateAccountController(repository).run(req, res);
    });
    router.put("/account/:accountId/client", (req, res) => {
        getAddClientController(repository).run(req, res);
    });
    router.put("/account/:accountId/client/:clientId/addon", (req, res) => {
        getAddAddonToClientController(repository).run(req, res);
    });
    router.get("/account", (req, res) => {
        res.send("get!");
    });
};
