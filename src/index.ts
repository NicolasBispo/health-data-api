import 'tsconfig-paths/register'
import { AppDataSource } from "./config/database";
import express from "express";
import appRouter from "./routes";

async function server() {
  await AppDataSource.initialize();
  const app = express();
  app.use(appRouter);
  app.use(express.json());

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}

server();
