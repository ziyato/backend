import { Router } from "express";
import iceboxController from "../controllers/icebox.controller";

const router = Router();

router.get("/:userId", iceboxController.getFoodDataAll);
router.get("/:userId/:foodId", iceboxController.getFoodData);
router.post("/:userId", iceboxController.postFoodData);

export default router;