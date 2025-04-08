import { FastifyInstance } from "fastify";
import { DoctorController } from "@/modules/doctors/doctor_controller";

export const doctorRoutes = async (fastify: FastifyInstance) => {
  const controller = new DoctorController();

  fastify.get("/", controller.index);
  fastify.post("/", controller.create);
  fastify.get("/:id", controller.show);
  fastify.put("/:id", controller.update);
  fastify.delete("/:id", controller.destroy);
};
