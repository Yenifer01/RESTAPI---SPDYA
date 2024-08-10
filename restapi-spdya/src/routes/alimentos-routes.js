import { Router } from "express";
import { methods as alimentosController } from "../controllers/alimentos-controller";
const router = Router();

router.get("/", alimentosController.getAlimentos);
router.get("/:id_alimento", alimentosController.getAlimento);
router.post("/", alimentosController.addAlimentos);
router.put("/:id_alimento", alimentosController.updateAlimento); 
router.delete("/:id_alimento", alimentosController.deleteAlimento); 


export default router;


