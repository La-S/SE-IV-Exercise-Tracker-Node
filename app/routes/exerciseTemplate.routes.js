import exerciseTemplate from "../controllers/exerciseTemplate.controller.js";
import authenticate from "../authorization/authorization.js";
import isCoachAdmin from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()


// Create a new exerciseTemplate
router.post("/", [authenticate, isCoachAdmin], exerciseTemplate.create);

// Retrieve all exerciseTemplates
router.get("/", [authenticate], exerciseTemplate.findAll);

// Retrieve a single exerciseTemplate with id
router.get("/:id", [authenticate], exerciseTemplate.findOne);

// Update an exerciseTemplate with id
router.put("/:id", [authenticate, isCoachAdmin], exerciseTemplate.update);

// Delete an exerciseTemplate with id
router.delete("/:id", [authenticate, isCoachAdmin], exerciseTemplate.delete);


export default router;

