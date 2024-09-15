import "reflect-metadata";
import compress from "compression";
import bodyParser from "body-parser";
// import errorHandler from "errorhandler";
import express, { Request, Response } from "express";
import Router from "express-promise-router";
import helmet from "helmet";
import * as http from "http";
import httpStatus from "http-status";

import { registerRoutes } from "./routes";
import { AppDataSource } from "../../../Contexts/Shared/infrastructure/persistence/postgres/db.factory";
import { NotificationFactory } from "../../../Contexts/Backoffice/Shared/domain/notification.factory";
import { EmailNotifier } from "../../../Contexts/Backoffice/Shared/infrastructure/notifications/email.adapter";
import { SMSNotifier } from "../../../Contexts/Backoffice/Shared/infrastructure/notifications/sms.adapter";
import { WhatsappNotifier } from "../../../Contexts/Backoffice/Shared/infrastructure/notifications/whatsapp.adapter";

export class Server {
  private readonly express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
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

    const notificationFactory = NotificationFactory.getInstance();
    notificationFactory.register("email", new EmailNotifier());
    notificationFactory.register("sms", new SMSNotifier());
    notificationFactory.register("whatsapp", new WhatsappNotifier());



    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, _next: () => void) => {
      console.log("err midd",err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    try {
      await AppDataSource.initialize();
    } catch (error) {
      console.log("db-error", error);
    }

    return new Promise((resolve) => {
      const env = this.express.get("env") as string;
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `  Mock Backend App is running at http://localhost:${this.port} in ${env} mode`
        );
        console.log("  Press CTRL-C to stop\n");
        resolve();
      });
    });
  }

  getHTTPServer(): Server["httpServer"] {
    return this.httpServer;
  }

  async stop(): Promise<void> {
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
  }
}
