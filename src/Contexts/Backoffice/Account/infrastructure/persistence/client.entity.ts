import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  Index,
  OneToMany,
} from "typeorm";
import { Account } from "./account.entity";
import { ClientAddon } from "./clientAddon.entity";

@Index(["email", "account"], { unique: true })
@Entity("clients")
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  cellphone: string;

  @Column({
    type: "varchar",
    enum: ["active", "inactive", "deleted"],
    default: "inactive",
  })
  status: string;

  @ManyToOne(() => Account, (account) => account.clients)
  account: Account;

  @OneToMany(() => ClientAddon, (clientAddon) => clientAddon.client)
  clientAddons: ClientAddon[];
}
