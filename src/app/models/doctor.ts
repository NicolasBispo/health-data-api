import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AppBaseEntity } from "@/shared/entities/app-base-entity";
import { Hospital } from "./hospital";

@Entity()
export class Doctor extends AppBaseEntity {
  @Column()
  crm: string;

  @Column()
  specialty: string;

  @ManyToMany(() => Hospital, hospital => hospital.doctors)
  @JoinTable()
  hospitals: Hospital[];
}
