import { Doctor, Hospital, Patient, User } from "@/app/models";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "nicolasbispo",
  password: undefined,
  database: "health-data-api",
  synchronize: true,
  logging: false,
  entities: [User, Hospital, Doctor, Patient],
  migrations: [],
  subscribers: [],
});
