import * as express from "express";
import { userRouter } from "./controllers/user";

const router: express.Router = express.Router();

router.use("/user", userRouter);

export default router;
