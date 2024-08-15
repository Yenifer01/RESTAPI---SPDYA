import { Router } from "express";
import { methods as intensidadController } from "../controllers/intensidad-controller";
const router = Router();

router.get("/", intensidadController.getIntensidad);

export default router;


