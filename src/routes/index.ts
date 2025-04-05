import { Router } from "express";
import { doctorRoutes } from "./doctor_routes";

const appRouter = Router();

appRouter.use("/doctors", doctorRoutes);

export default appRouter