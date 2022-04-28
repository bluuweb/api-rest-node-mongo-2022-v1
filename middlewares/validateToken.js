import jwt from "jsonwebtoken";
import { errorsToken } from "../helpers/errorsToken.js";

export const validateToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("No existe el token");

        // Bearer Authentication
        token = token.split(" ")[1];

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = id;
        next();
    } catch (error) {
        console.log(error);
        const data = errorsToken(error);
        return res.status(401).json({ ok: false, data });
    }
};
