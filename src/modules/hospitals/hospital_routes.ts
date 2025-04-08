import { FastifyInstance } from "fastify";
import { HospitalsController } from "@/modules/hospitals/hospital_controller";

export const hospitalRoutes = async (fastify: FastifyInstance) => {
  const controller = new HospitalsController();

  fastify.get("/", controller.index);
  fastify.post("/", controller.create);
  fastify.get("/:id", controller.show);
  fastify.put("/:id", controller.update);
  fastify.delete("/:id", controller.destroy);
};
