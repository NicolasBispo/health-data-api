import { DoctorController } from "@/app/controllers";

import { Router } from "express";

const router = Router();

router.get("/", DoctorController.handle("findAllDoctors"));
router.post("/", DoctorController.handle("createDoctor"));
router.get("/:id", DoctorController.handle("findOneDoctor"));
router.get("/:id", DoctorController.handle("updateDoctor"));
router.get("/:id", DoctorController.handle("destroyDoctor"));

export const doctorRoutes = router;
