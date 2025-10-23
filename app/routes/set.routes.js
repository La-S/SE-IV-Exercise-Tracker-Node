  import set from "../controllers/set.controller.js";
  import { Router } from "express";
  var router = Router()

  // Create a new Team
  router.post("/", set.create);

  // Find all the Teams (todo: idk why you'd ever do this and seems like a security concern but...)
  router.get("/", set.findAll);

  // Retrieve a single Team with id
  router.get("/:id", set.findOne);

  // Update a Team with id
  router.put("/:id", set.update);

  // Delete a Team with id
  router.delete("/:id", set.delete);

export default router