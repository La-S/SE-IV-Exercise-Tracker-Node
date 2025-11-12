import workout from "../controllers/workout.controller.js";
import { Router } from "express";
var router = Router()

// Create a new set
router.post("/", workout.create);

// Find all the Sets
router.get("/", workout.findAll);

// Retrieve a single set with id
router.get("/:id", workout.findOne);

// Update a set with id
router.put("/:id", workout.update);

// Delete a set with id
router.delete("/:id", workout.delete);

router.get("/:id/exercises", workout.getExercises);

router.get("/user/:id", workout.getWorkoutsForUser);

router.get("/user/:id/dated", workout.getUserWorkoutsDated);

export default router