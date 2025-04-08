import { Column, Entity, ManyToMany } from "typeorm";
import { AppBaseEntity } from "@/shared/entities/app_base_entity";

import { Hospital } from "@modules/hospitals/hospital_entity";

@Entity()
export class Patient extends AppBaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  cpf!: string;

  @ManyToMany(() => Hospital, (hospital) => hospital.patients)
  hospitals: Hospital[] = [];
}
