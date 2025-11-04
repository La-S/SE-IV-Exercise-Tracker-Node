  import exercise from "../controllers/exercise.controller.js";
  import  authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  //AUTHENTICATE ALWAYS RETURNS TRUE

  // Create a new User
  router.post("/", [authenticate], exercise.create);

  // Retrieve all People
  router.get("/", [authenticate], exercise.findAll);

  // Retrieve a single User with id
  router.get("/:id", [authenticate], exercise.findOne);

  // Update a User with id
  router.put("/:id", [authenticate], exercise.update);

  // Delete a User with id
  router.delete("/:id", [authenticate], exercise.delete);

  router.get("/:id/sets", exercise.getSets);

  export default router;

