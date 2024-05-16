import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/", userController.userLogin);
router.post("/", userController.userSignin);

export default router;
