import { Request, Response, Router } from "express";
import { CreateAddonController } from "../controllers/addon/CreateAddonController";
import { getCreateAddoonController } from "../dependency-injection/addonContainer";

export const register = (router: Router): void => {
  console.log("registering routes");

  const createAddonController: CreateAddonController =
    getCreateAddoonController();
  router.post("/addon", (req: Request, res: Response) => {
    createAddonController.run(req, res);
    // res.send("post!")
  });

  router.get("/addon", (req: Request, res: Response) => {
    res.send("get!");
  });
};
