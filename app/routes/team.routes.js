import team from "../controllers/team.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()

// Create a new Team
router.post("/", [authenticate], team.create);

// Find all the Teams (todo: idk why you'd ever do this and seems like a security concern but...)
router.get("/", [authenticate], team.findAll);

// Retrieve a single Team with id
router.get("/:id", [authenticate], team.findOne);

// Update a Team with id
router.put("/:id", [authenticate], team.update);

// Delete a Team with id
router.delete("/:id", [authenticate], team.delete);

router.post("/:id/users", [authenticate], team.addUsers);

router.delete("/:id/users", [authenticate], team.removeUsers);

router.get("/:id/users", [authenticate], team.getUsers);
export default router