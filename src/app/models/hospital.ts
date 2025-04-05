import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Doctor } from "./doctor";
import { AppBaseEntity } from "@/shared/entities/app-base-entity";

@Entity()
export class Hospital extends AppBaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.hospitals)
  doctors: Doctor[];
}
