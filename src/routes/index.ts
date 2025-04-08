import { FastifyInstance } from "fastify";
import { doctorRoutes } from "./doctor_routes";

const appRouter = async (fastify: FastifyInstance) => {
  // Aqui registramos as rotas dos doctors como um plugin
  fastify.register(doctorRoutes, { prefix: "/doctors" });
};

export default appRouter;
