import workout from "../controllers/workout.controller.js";
import authenticate from "../authorization/authorization.js";
import isCoachAdmin from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()

// Create a new workout
router.post("/", [authenticate, isCoachAdmin], workout.create);

// Find all the workouts
router.get("/", [authenticate, isCoachAdmin], workout.findAll);

// Retrieve a single workout with id
router.get("/:id", [authenticate], workout.findOne);

// Update a workout with id
router.put("/:id", [authenticate, isCoachAdmin], workout.update);

// Delete a workout with id
router.delete("/:id", [authenticate, isCoachAdmin], workout.delete);

//get exercises in workout
router.get("/:id/exercises", [authenticate], workout.getExercises);

//get workouts for user
router.get("/user/:id", [authenticate], workout.getWorkoutsForUser);

//get workouts for user in date range
router.get("/user/:id/dated", [authenticate], workout.getUserWorkoutsDated);

export default router