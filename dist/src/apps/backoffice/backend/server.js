var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "reflect-metadata";
import compress from "compression";
import bodyParser from "body-parser";
// import errorHandler from "errorhandler";
import express from "express";
import Router from "express-promise-router";
import helmet from "helmet";
import httpStatus from "http-status";
import { registerRoutes } from "./routes";
import { AppDataSource } from "../../../Contexts/Shared/infrastructure/persistence/postgres/db.factory";
export class Server {
    constructor(port) {
        this.port = port;
        this.express = express();
        this.express.use(helmet.xssFilter());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(helmet.noSniff());
        this.express.use(helmet.hidePoweredBy());
        this.express.use(helmet.frameguard({ action: "deny" }));
        this.express.use(compress());
        const router = Router();
        // router.use(errorHandler());
        this.express.use(router);
        registerRoutes(router);
        router.use((err, req, res, _next) => {
            console.log("err midd", err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AppDataSource.initialize();
            }
            catch (error) {
                console.log("db-error", error);
            }
            return new Promise((resolve) => {
                const env = this.express.get("env");
                this.httpServer = this.express.listen(this.port, () => {
                    console.log(`  Mock Backend App is running at http://localhost:${this.port} in ${env} mode`);
                    console.log("  Press CTRL-C to stop\n");
                    resolve();
                });
            });
        });
    }
    getHTTPServer() {
        return this.httpServer;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.httpServer) {
                    this.httpServer.close((error) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve();
                    });
                }
                resolve();
            });
        });
    }
}
