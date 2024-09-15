import { Nullable } from "../../../Shared/domain/Nullable";
import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { AddonId } from "./valueObjects/AddonId";
import { AddonName } from "./valueObjects/AddonName";

export class Addon extends AggregateRoot {
  id?: AddonId;
  name: AddonName;

  constructor(
    id: Nullable<AddonId>,
    name: AddonName,
  ) {
    super();
    if (id) {
      this.id = id;
    }
    this.name = name;
  }

  static create(
    id: AddonId,
    name: AddonName,
  ): Addon {
    return new Addon(id, name);
  }

  static fromPrimitives(plainData: {
    id?: number;
    name: string;
  }): Addon {
    return new Addon(
      plainData.id ? new AddonId(plainData.id) : null,
      new AddonName(plainData.name, AddonName.ADDON_NAMES),
    );
  }

  toPrimitives() {
    return {
      id: this.id?.value,
      name: this.name.value,
    };
  }

}
