import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AppBaseEntity } from "@/shared/entities/app-base-entity";
import { User } from "./user";

@Entity()
export class Patient extends AppBaseEntity {
  @Column()
  cpf: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
