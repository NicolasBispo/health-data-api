import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Doctor } from "@modules/doctors/doctor_entity";
import { AppBaseEntity } from "@/shared/entities/app_base_entity";
import { Patient } from "@modules/patients/patient_entity";

@Entity()
export class Hospital extends AppBaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.hospitals)
  doctors: Doctor[];

  @ManyToMany(() => Patient, (patient) => patient.hospitals)
  @JoinTable()
  patients: Patient[];
}
