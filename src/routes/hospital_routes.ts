import { HospitalsController } from "@/app/controllers";

import { Router } from "express";

const router = Router();

router.get("/", HospitalsController.handle("findAllHospitals"));
router.post("/", HospitalsController.handle("createHospital"));
router.get("/:id", HospitalsController.handle("findOneHospital"));
router.get("/:id", HospitalsController.handle("updateHospital"));
router.get("/:id", HospitalsController.handle("destroyHospital"));

export const doctorRoutes = router;
