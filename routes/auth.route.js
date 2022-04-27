import express from "express";
import {
    login,
    register,
    infoUser,
    refreshToken,
    logout,
} from "../controllers/auth.controller.js";
import { validatorExpress } from "../middlewares/validatorExpress.js";
import { validateToken } from "../middlewares/validateToken.js";
import { body } from "express-validator";
const router = express.Router();

router.post(
    "/register",
    [
        body("email", "Ingrese un email válido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Contraseña mínimo 6 carácteres")
            .trim()
            .isLength({ min: 6 })
            .custom((value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error("No coinciden las contraseñas");
                }
                return value;
            }),
    ],
    validatorExpress,
    register
);

router.post(
    "/login",
    [
        body("email", "Ingrese un email válido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Contraseña mínimo 6 carácteres")
            .trim()
            .isLength({ min: 6 }),
    ],
    validatorExpress,
    login
);

router.get("/protected", validateToken, infoUser);

router.get("/refresh", refreshToken);

router.get("/logout", logout);

export default router;
