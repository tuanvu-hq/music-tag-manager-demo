import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { CONSTANTS_DARK_MODE, CONSTANTS_DARK_MODE_LIST, CONSTANTS_TW_COLOR, CONSTANTS_TW_COLOR_LIST } from "../../constants";
import type { Color, Mode, TypeormClassPropertyTuple } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";

@Entity("theme")
export class ThemeTypeorm {
  @PrimaryColumn("int", { name: "id", default: 1 })
  id!: number;
  @Column({ name: "color", type: "enum", enum: CONSTANTS_TW_COLOR_LIST, default: CONSTANTS_TW_COLOR.rose })
  color!: Color;
  @Column({ name: "mode", type: "enum", enum: CONSTANTS_DARK_MODE_LIST, default: CONSTANTS_DARK_MODE.light })
  mode!: Mode;
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;

  setId(payload: number) {
    this.id = payload;

    return this;
  }

  setColor(payload: Color) {
    this.color = payload;

    return this;
  }

  setMode(payload: Mode) {
    this.mode = payload;

    return this;
  }

  build() {
    if (this.id === undefined) this.id = 1;
    if (this.color === undefined) this.color = "rose";
    if (this.mode === undefined) this.mode = "light";

    const properties: TypeormClassPropertyTuple[] = [
      ["ID", this.id],
      ["Color", this.color],
      ["Mode", this.mode],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`Theme [${property}] is not defined.`);
    }

    return this;
  }
}
