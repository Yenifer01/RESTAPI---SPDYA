import { Router } from "express";
import { methods as gruposController } from "../controllers/grupos-controller";
const router = Router();

router.get("/", gruposController.getGrupos);

export default router;


