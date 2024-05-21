import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.post("/login", userController.userLogin);
router.post("/signup", userController.userSignup);
router.get("/:userId", userController.userProfile);

export default router;
