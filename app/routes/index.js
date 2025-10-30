import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import WorkoutRoutes from "./workout.routes.js"
import TeamRoutes from "./team.routes.js";
import SetRoutes from "./set.routes.js"
import Exercise from "./exercise.routes.ts";
import ExerciseTemplate from "./exerciseTemplate.routes.ts";


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/workout", WorkoutRoutes);
router.use("/exercise", Exercise);
router.use("/team", TeamRoutes);
router.use("/set", SetRoutes)
router.use("/exerciseTemplate", ExerciseTemplate);

export default router;
