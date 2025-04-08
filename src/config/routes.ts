import { FastifyInstance } from "fastify";
import { doctorRoutes } from "@modules/doctors/doctor_routes";
import { hospitalRoutes } from "@/modules/hospitals/hospital_routes";
import { patientsRoutes } from "@/modules/patients/patient_routes";

const appRouter = async (fastify: FastifyInstance) => {
  // Aqui registramos as rotas dos doctors como um plugin
  fastify.register(doctorRoutes, { prefix: "/doctors" });
  fastify.register(hospitalRoutes, { prefix: "/hospitals" });
  fastify.register(patientsRoutes, { prefix: "/patients" });
};

export default appRouter;
