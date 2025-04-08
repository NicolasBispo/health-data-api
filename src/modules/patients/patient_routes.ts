import { FastifyInstance } from "fastify";
import { PatientsController } from "@/modules/patients/patient_controller";

export const patientsRoutes = async (fastify: FastifyInstance) => {
  const controller = new PatientsController();

  fastify.get("/", controller.index);
  fastify.post("/", controller.create);
  fastify.get("/:id", controller.show);
  fastify.put("/:id", controller.update);
  fastify.delete("/:id", controller.destroy);
};
