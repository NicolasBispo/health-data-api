import { DoctorController } from "@/app/controllers";

import { Router } from "express";

const router = Router();

router.get("/", DoctorController.handle("findAllDoctors"));

export const doctorRoutes = router;
