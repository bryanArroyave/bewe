import { getCreateAddoonController } from "../dependency-injection/addonContainer";
export const register = (router) => {
    console.log("registering routes");
    const createAddonController = getCreateAddoonController();
    router.post("/addon", (req, res) => {
        createAddonController.run(req, res);
        // res.send("post!")
    });
    router.get("/addon", (req, res) => {
        res.send("get!");
    });
};
