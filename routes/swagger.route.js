import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import express from "express";

const swaggerDocument = YAML.load("./swagger.yaml");
const router = express.Router();

router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default router;
