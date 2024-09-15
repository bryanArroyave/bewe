import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Addon } from "../../../../Backoffice/Addon/infrastructure/persistence/Addon.entity";
import { Account } from "../../../../Backoffice/Account/infrastructure/persistence/account.entity";
import { Client } from "../../../../Backoffice/Account/infrastructure/persistence/client.entity";
import { ClientAddon } from "../../../../Backoffice/Account/infrastructure/persistence/clientAddon.entity";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [Addon, Account, Client, ClientAddon],
    logging: true,
});
