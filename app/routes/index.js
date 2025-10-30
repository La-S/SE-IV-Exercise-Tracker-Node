import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import Team from "./team.routes.js";
import Exercise from "./exercise.routes.ts";
import ExerciseTemplate from "./exerciseTemplate.routes.ts";


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/team", Team);
router.use("/exercise", Exercise);
router.use("/exerciseTemplate", ExerciseTemplate);

export default router;
