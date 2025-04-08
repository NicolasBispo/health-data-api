import { AppBaseEntity } from "@/shared/entities/app_base_entity";
import { Column, Entity } from "typeorm";

export enum ContactableType {
  PATIENT = "PATIENT",
  HOSPITAL = "HOSPITAL",
  DOCTOR = "DOCTOR",
}
@Entity()
export class ContactInfo extends AppBaseEntity {
  @Column({ nullable: false })
  value!: string;

  @Column()
  type!: string;

  @Column({
    type: "enum",
    enum: ContactableType,
  })
  contactableType!: ContactableType;

  @Column()
  contactableId!: string;
}
