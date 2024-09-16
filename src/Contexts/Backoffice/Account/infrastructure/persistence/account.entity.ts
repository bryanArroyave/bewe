import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Client } from "./client.entity";

@Entity("accounts")
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255 })
  type: string;

  @Column({
    type: "varchar",
    enum: ["active", "inactive", "deleted"],
    default: "inactive",
  })
  status: string;

  @OneToMany(() => Client, (client) => client.account)
  clients: Client[];
}
