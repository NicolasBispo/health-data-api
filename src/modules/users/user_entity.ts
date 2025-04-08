import { Entity, Column, OneToOne } from "typeorm";
import { Doctor } from "@modules/doctors/doctor_entity";
import { AppBaseEntity } from "@/shared/entities/app_base_entity";

@Entity()
export class User extends AppBaseEntity {
  @Column({
    nullable: false,
  })
  firstName!: string;

  @Column({
    nullable: false,
  })
  lastName!: string;

  @Column({
    unique: true,
    nullable: false,
    type: "varchar",
  })
  email!: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  password!: string;

  @Column({
    default: false,
    type: "boolean",
  })
  isAdmin: boolean = false;

  @Column({
    default: false,
    type: "boolean",
  })
  isActive: boolean = true;

  @OneToOne(() => Doctor, (doctor) => doctor.user, {
    cascade: true,
    nullable: true,
  })
  doctor!: Doctor;
}
