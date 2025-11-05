import exerciseTemplate from "../controllers/exerciseTemplate.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router()

//AUTHENTICATE ALWAYS RETURNS TRUE

// Create a new exerciseTemplate
router.post("/", [authenticate], exerciseTemplate.create);

// Retrieve all exerciseTemplates
router.get("/", [authenticate], exerciseTemplate.findAll);

// Retrieve a single exerciseTemplate with id
router.get("/:id", [authenticate], exerciseTemplate.findOne);

// Update an exerciseTemplate with id
router.put("/:id", [authenticate], exerciseTemplate.update);

// Delete an exerciseTemplate with id
router.delete("/:id", [authenticate], exerciseTemplate.delete);


export default router;

