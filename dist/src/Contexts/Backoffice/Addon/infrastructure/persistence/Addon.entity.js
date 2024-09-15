var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { ClientAddon } from "../../../Account/infrastructure/persistence/clientAddon.entity";
let Addon = class Addon extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn({ type: "int" }),
    __metadata("design:type", Number)
], Addon.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], Addon.prototype, "name", void 0);
__decorate([
    OneToMany(() => ClientAddon, (clientAddon) => clientAddon.client),
    __metadata("design:type", Array)
], Addon.prototype, "clientAddons", void 0);
Addon = __decorate([
    Entity("addons")
], Addon);
export { Addon };
