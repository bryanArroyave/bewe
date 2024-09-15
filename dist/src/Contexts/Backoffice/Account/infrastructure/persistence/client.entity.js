var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, Index, OneToMany, } from "typeorm";
import { Account } from "./account.entity";
import { ClientAddon } from "./clientAddon.entity";
let Client = class Client extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn({ type: "int" }),
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    Column({ type: "boolean" }),
    __metadata("design:type", Boolean)
], Client.prototype, "active", void 0);
__decorate([
    ManyToOne(() => Account, (account) => account.clients),
    __metadata("design:type", Account)
], Client.prototype, "account", void 0);
__decorate([
    OneToMany(() => ClientAddon, (clientAddon) => clientAddon.client),
    __metadata("design:type", Array)
], Client.prototype, "clientAddons", void 0);
Client = __decorate([
    Index(["email", "account"], { unique: true }),
    Entity("clients")
], Client);
export { Client };
