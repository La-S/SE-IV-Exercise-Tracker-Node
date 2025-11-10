import workout from "../controllers/workout.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()

// Create a new set
router.post("/", [authenticate], workout.create);

// Find all the Sets
router.get("/", [authenticate], workout.findAll);

// Retrieve a single set with id
router.get("/:id", [authenticate], workout.findOne);

// Update a set with id
router.put("/:id", [authenticate], workout.update);

// Delete a set with id
router.delete("/:id", [authenticate], workout.delete);

router.get("/:id/exercises", [authenticate], workout.getExercises);

router.get("/user/:id", [authenticate], workout.getWorkoutsForUser);

router.get("/user/:id/dated", [authenticate], workout.getUserWorkoutsDated);

export default router