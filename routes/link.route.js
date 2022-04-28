import express from "express";
import { body } from "express-validator";
import axios from "axios";
import {
    addLinks,
    getLink,
    getLinks,
    removeLinks,
    updateLinks,
} from "../controllers/link.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validatorExpress } from "../middlewares/validatorExpress.js";
const router = express.Router();

router.use(validateToken);

router.get("/", getLinks);
router.get("/:id", getLink);
router.post(
    "/",
    [
        body("longlink", "Escribe una enlace correcto")
            .trim()
            // .matches(/^(09|\+639)\d{9}$/)
            .custom(async (value, { req }) => {
                try {
                    const protocol = ["http", "https"];
                    if (!value.includes(protocol)) {
                        value = `https://${value}`;
                    }
                    await axios.get(value);
                    req.longlink = value;
                    return value;
                } catch (error) {
                    // console.log(error.code);
                    // console.log(error.response?.status);
                    throw new Error(
                        "No se puede conectar con el link entregado"
                    );
                }
            }),
    ],
    validatorExpress,
    addLinks
);
router.put("/:id", updateLinks);
router.delete("/:id", removeLinks);

export default router;
