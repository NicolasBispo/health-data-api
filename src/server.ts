import "tsconfig-paths/register";
import { AppDataSource } from "./config/database";
import fastify from "fastify";
import appRouter from "@/config/routes";

async function startServer() {
  await AppDataSource.initialize();
  const server = fastify();
  server.register(appRouter);

  server.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error("Erro ao iniciar o servidor:", err);
      process.exit(1);
    }
    console.log(`Servidor rodando na porta 3000 em ${address}`);
  });
}

startServer();
