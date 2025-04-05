import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Patient } from "./patient";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
    type: "varchar",
  })
  email: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  password: string;

  @Column({
    default: false,
    type: "boolean",
  })
  isAdmin: boolean;

  @Column({
    default: false,
    type: "boolean",
  })
  isActive: boolean;

  @OneToOne(() => Patient, (patient) => patient.user, {
    cascade: true,
  })
  patient: Patient;
}
