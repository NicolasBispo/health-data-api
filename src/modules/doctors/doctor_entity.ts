import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from "typeorm";
import { AppBaseEntity } from "@/shared/entities/app_base_entity";
import { Hospital } from "@modules/hospitals/hospital_entity";
import { User } from "@modules/users/user_entity";

@Entity()
export class Doctor extends AppBaseEntity {
  @Column()
  crm!: string;

  @Column()
  specialty!: string;

  @ManyToMany(() => Hospital, (hospital : Hospital) => hospital.doctors)
  @JoinTable()
  hospitals: Hospital[] = [];

  @OneToOne(() => User, (user) => user.doctor)
  @JoinColumn()
  user!: User;
}
