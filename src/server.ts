import "tsconfig-paths/register";
import { AppDataSource } from "./config/database";
import fastify from 'fastify'
import appRouter from "./routes";

async function startServer() {
  await AppDataSource.initialize();
  const server = fastify();
  server.register(appRouter);
  server.use(express.json());

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}

startServer();
