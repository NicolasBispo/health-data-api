import { FastifyInstance } from "fastify";
import { DoctorController } from "@/app/controllers";

export const doctorRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", DoctorController);
  fastify.post("/", DoctorController.handle("createDoctor"));
  fastify.get("/:id", DoctorController.handle("findOneDoctor"));
  fastify.put("/:id", DoctorController.handle("updateDoctor")); // corrigido de GET para PUT
  fastify.delete("/:id", DoctorController.handle("destroyDoctor")); // corrigido de GET para DELETE
};
