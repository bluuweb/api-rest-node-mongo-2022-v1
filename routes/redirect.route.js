import e from "express";
import { param } from "express-validator";
import { redirect } from "../controllers/link.controller.js";
import { validatorExpress } from "../middlewares/validatorExpress.js";
const router = e.Router();

router.get(
    "/:nanolink",
    [param("nanolink", "Formato id incorrecto").trim().escape()],
    validatorExpress,
    redirect
);

export default router;
