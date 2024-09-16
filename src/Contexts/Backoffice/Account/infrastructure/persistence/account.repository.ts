import { CustomError } from "../../../Shared/errors/Custom.error";
import { Account } from "../../domain/Account";
import { IAccountRepository } from "../../domain/AccountRepository";
import { Client } from "../../domain/Client";
import { clientAddonsDto } from "../../domain/dtos/clientAddons.dto";
import { AccountId } from "../../domain/valueObjects/AccountId";
import { ClientId } from "../../domain/valueObjects/ClientId";
import { Account as AccountEntity } from "./account.entity";
import { Client as ClientEntity } from "./client.entity";
import { ClientAddon as ClientAddonEntity } from "./clientAddon.entity";

export class AccountRepository implements IAccountRepository {
  async saveClient(accountId: AccountId, clientData: Client): Promise<void> {
    const _client = new ClientEntity();

    _client.id = clientData.id?.value || 0;
    _client.name = clientData.name.value;
    _client.email = clientData.email.value;
    _client.cellphone = clientData.cellphone.value;
    _client.status = clientData.status.value;

    const _account = new AccountEntity();
    _account.id = accountId.value;

    _client.account = _account;

    await _client.save();
  }

  async getById(id: AccountId): Promise<Account | null> {
    const _account = await AccountEntity.createQueryBuilder("account")
      .leftJoinAndSelect(
        "account.clients",
        "client",
        "client.status != :clientStatus",
        { clientStatus: "deleted" }
      )
      .where("account.id = :accountId", { accountId: id.value })
      .andWhere("account.status != :accountStatus", {
        accountStatus: "deleted",
      })
      .getOne();

    if (_account) {
      return Account.fromPrimitives({
        id: _account.id,
        name: _account.name,
        type: _account.type,
        status: _account.status,
        clients: _account.clients,
      });
    }

    return null;
  }

  async save(account: Account): Promise<number> {
    const _account = new AccountEntity();
    _account.id = account.id?.value || 0;
    _account.name = account.name.value;
    _account.type = account.type.value;
    _account.status = account.status.value;
    await _account.save();
    return _account.id;
  }

  async rechargeClientAddon(
    clientId: ClientId,
    addonId: number,
    quantity: number
  ): Promise<void> {
    try {
      let _clientAddon = await ClientAddonEntity.findOne({
        where: { clientId: clientId.value, addonId: addonId },
      });

      if (_clientAddon) {
        _clientAddon.quantity += quantity;
        await _clientAddon.save();
        return;
      }
      _clientAddon = new ClientAddonEntity();

      _clientAddon.clientId = clientId.value;
      _clientAddon.addonId = addonId;
      _clientAddon.quantity = quantity;
      await _clientAddon.save();
    } catch (error: any) {
      if (
        error.message.includes(
          'insert or update on table "client_addons" violates foreign key constraint'
        )
      ) {
        throw new CustomError("Addon not found");
      }
    }
  }

  async decreaseClientAddon(
    clientId: ClientId,
    addonId: number,
    quantity: number
  ): Promise<void> {
    try {
      let _clientAddon = await ClientAddonEntity.findOne({
        where: { clientId: clientId.value, addonId: addonId },
      });

      if (!_clientAddon) {
        throw new CustomError("Addon not found");
      }
      _clientAddon.quantity -= quantity;
      await _clientAddon.save();
    } catch (error: any) {
      if (
        error.message.includes(
          'insert or update on table "client_addons" violates foreign key constraint'
        )
      ) {
        throw new CustomError("Addon not found");
      }
    }
  }

  async getClientAddons(
    accountId: AccountId,
    clientId: AccountId
  ): Promise<clientAddonsDto[]> {
    const res = await ClientAddonEntity.query(
      `
        SELECT 
          ca."addonId" as id,
          a.name,
          ca.quantity
        FROM client_addons ca
        INNER JOIN clients c ON c.id = ca."clientId"
        INNER JOIN addons a ON a.id = ca."addonId"
        WHERE c.id = ${clientId.value} AND c."accountId" = ${accountId.value} AND c.status = 'active'
    `,
      []
    );

    return res.map((r: any) => {
      return {
        name: r.name,
        quantity: r.quantity,
        addonId: r.id,
      };
    });
  }
}
