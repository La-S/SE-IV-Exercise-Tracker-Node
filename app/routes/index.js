import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TeamRoutes from "./team.routes.js";
import SetRoutes from "./set.routes.js"

const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/team", TeamRoutes);
router.use("/set", SetRoutes)

export default router;
