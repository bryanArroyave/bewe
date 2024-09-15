import { Entity, Column, ManyToOne, BaseEntity } from "typeorm";
import { Addon } from "../../../Addon/infrastructure/persistence/Addon.entity";
import { Client } from "./client.entity";

@Entity("client_addons")
export class ClientAddon extends BaseEntity {
  @Column({ type: "int", primary: true })
  clientId: number;
  @Column({ type: "int", primary: true })
  addonId: number;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @ManyToOne(() => Client, (client) => client.clientAddons)
  client: Client;

  @ManyToOne(() => Addon, (addon) => addon.clientAddons)
  addon: Addon;
}
