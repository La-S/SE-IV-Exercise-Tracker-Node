import team from "../controllers/team.controller.js";
import authenticate from "../authorization/authorization.js";
import isCoachAdmin from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()

// Create a new Team
router.post("/", [authenticate, isCoachAdmin], team.create);

// Find all the Teams (todo: idk why you'd ever do this and seems like a security concern but...)
router.get("/", [authenticate], team.findAll);

// Retrieve a single Team with id
router.get("/:id", [authenticate], team.findOne);

// Update a Team with id
router.put("/:id", [authenticate, isCoachAdmin], team.update);

// Delete a Team with id
router.delete("/:id", [authenticate, isCoachAdmin], team.delete);

router.post("/:id/users", [authenticate, isCoachAdmin], team.addUsers);

router.delete("/:id/users", [authenticate, isCoachAdmin], team.removeUsers);

router.get("/:id/users", [authenticate], team.getUsers);

router.get("/:id/workouts/dated", [authenticate, isCoachAdmin], team.getWorkoutsDated);

export default router