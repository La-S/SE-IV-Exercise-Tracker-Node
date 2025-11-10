import users from "../controllers/user.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()


// Create a new User
router.post("/", [authenticate], users.create);

// Retrieve all People
router.get("/", [authenticate], users.findAll);

// Retrieve a single User with id
router.get("/:id", [authenticate], users.findOne);

// Update a User with idF
router.put("/:id", [authenticate], users.update);

router.put("/:id/role", [authenticate], users.updateRole)

// Delete a User with id
router.delete("/:id", [authenticate], users.delete);

//Get teams for user
router.get("/:id/teams", [authenticate], users.getTeams);

export default router;

