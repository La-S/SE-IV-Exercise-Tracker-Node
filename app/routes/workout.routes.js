import workout from "../controllers/workout.controller.js";
import auth from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()

// Create a new workout
router.post("/", [auth.authenticate, auth.isCoachAdmin], workout.create);

// Find all the workouts
router.get("/", [auth.authenticate, auth.isCoachAdmin], workout.findAll);

// Retrieve a single workout with id
router.get("/:id", [auth.authenticate], workout.findOne);

// Update a workout with id
router.put("/:id", [auth.authenticate, auth.isCoachAdmin], workout.update);

// Delete a workout with id
router.delete("/:id", [auth.authenticate, auth.isCoachAdmin], workout.delete);

//get exercises in workout
router.get("/:id/exercises", [auth.authenticate], workout.getExercises);

//get workouts for user
router.get("/user/:id", [auth.authenticate], workout.getWorkoutsForUser);

//get workouts for user in date range
router.get("/user/:id/dated", [auth.authenticate], workout.getUserWorkoutsDated);

export default router