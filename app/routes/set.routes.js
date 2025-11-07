import set from "../controllers/set.controller.js";
import { Router } from "express";
var router = Router()

// Create a new set
router.post("/", set.create);

// Find all the Sets
router.get("/", set.findAll);

// Retrieve a single set with id
router.get("/:id", set.findOne);

// Update a set with id
router.put("/:id", set.update);

// Delete a set with id
router.delete("/:id", set.delete);

router.post("/exercise", set.createMany);

export default router