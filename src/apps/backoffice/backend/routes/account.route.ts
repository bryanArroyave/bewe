import { Request, Response, Router } from "express";
import {
  getAddAddonToClientController,
  getAddClientController,
  getCreateAccountController,
  getGetAddonsQuantityController,
  getHandleAccountSubscriptionController,
  getHandleClientSubscriptionController,
  getNotifyController,
} from "../dependency-injection/accountContainer";
import { IAccountRepository } from "../../../../Contexts/Backoffice/Account/domain/AccountRepository";
import { AccountRepository } from "../../../../Contexts/Backoffice/Account/infrastructure/persistence/account.repository";

export const register = (router: Router): void => {
  const repository: IAccountRepository = new AccountRepository();
  

  router.post("/account", (req: Request, res: Response) => {
    getCreateAccountController(repository).run(req, res);
  });

  router.put("/account/:accountId/client", (req: Request, res: Response) => {
    getAddClientController(repository).run(req, res);
  });

  router.put(
    "/account/:accountId/client/:clientId/addon",
    (req: Request, res: Response) => {
      getAddAddonToClientController(repository).run(req, res);
    }
  );

  router.put(
    "/account/:accountId/subscription",
    (req: Request, res: Response) => {
      getHandleAccountSubscriptionController(repository).run(req, res);
    }
  );

  router.put(
    "/account/:accountId/client/:clientId/subscription",
    (req: Request, res: Response) => {
      getHandleClientSubscriptionController(repository).run(req, res);
    }
  );

  router.post(
    "/account/:accountId/client/:clientId/notify",
    (req: Request, res: Response) => {
      getNotifyController(repository).run(req, res);
    }
  );

  router.get(
    "/account/:accountId/client/:clientId/addon",
    (req: Request, res: Response) => {
      getGetAddonsQuantityController(repository).run(req, res);
    }
  );
};
