var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import httpStatus from "http-status";
import handlerError from "../utils/handlerError";
export class CreateAccountController {
    constructor(usecase) {
        this.usecase = usecase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountDto = {
                name: req.body.name,
                type: req.body.type,
            };
            try {
                const accountId = yield this.usecase.createAccount(accountDto);
                res.status(httpStatus.CREATED).send({ account_id: accountId });
            }
            catch (error) {
                handlerError(error, res);
            }
        });
    }
}
