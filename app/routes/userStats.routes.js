import userStats from "../controllers/userStats.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

var router = Router();

// Create new user stat
router.post("/", [authenticate], userStats.create);

// Get all stats 
router.get("/", [authenticate], userStats.findAll);

// Get one stat
router.get("/:id", [authenticate], userStats.findOne);

// Update stat
router.put("/:id", [authenticate], userStats.update);

// Delete stat
router.delete("/:id", [authenticate], userStats.delete);

export default router;
