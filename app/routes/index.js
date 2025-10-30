import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import Team from "./team.routes.js";
import WorkoutRoutes from "./workout.routes.js"


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/team", Team);
router.use("/workout", WorkoutRoutes);

export default router;
