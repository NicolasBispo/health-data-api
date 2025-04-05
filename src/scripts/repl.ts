import { AppDataSource } from "../data-source";
import "tsconfig-paths/register";

AppDataSource.initialize().then(async () => {
  console.log("REPL TypeORM Iniciado!");
});
