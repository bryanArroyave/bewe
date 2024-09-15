import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClientAddon } from "../../../Account/infrastructure/persistence/clientAddon.entity";

@Entity("addons")
export class Addon extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @OneToMany(() => ClientAddon, (clientAddon) => clientAddon.client)
  clientAddons: ClientAddon[];
}
