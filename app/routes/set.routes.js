import set from "../controllers/set.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()

// Create a new set
router.post("/", [authenticate], set.create);

// Find all the Sets
router.get("/", [authenticate], set.findAll);

// Retrieve a single set with id
router.get("/:id", [authenticate], set.findOne);

// Update a set with id
router.put("/:id", [authenticate], set.update);

// Delete a set with id
router.delete("/:id", [authenticate], set.delete);

router.post("/exercise/:id", [authenticate], set.createMany);

export default router