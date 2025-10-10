  import team from "../controllers/team.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new Team
  router.post("/", [authenticate], team.create);

  // Find all the Teams (todo: idk why you'd ever do this and seems like a security concern but...)
  router.get("/", [authenticate], team.findAll);

  /*
  // Retrieve a single Team with id
  router.get("/:teamId", [authenticate], team.findOne);

  // Update a Team with id
  router.put("/:teamId", [authenticate], team.update);

  // Delete a Lesson with id
  router.delete("/:teamId", [authenticate], team.delete);
  */

export default router