import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TeamRoutes from "./team.routes.js";
import SetRoutes from "./set.routes.js"
import Team from "./team.routes.js";
import ExerciseTemplate from "./exerciseTemplate.routes.ts";


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/team", TeamRoutes);
router.use("/set", SetRoutes)
router.use("/team", Team);
router.use("/exerciseTemplate", ExerciseTemplate);

export default router;
