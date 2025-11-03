import db from "../models/index.js";
const Exercise = db.exercise;
const Op = db.Sequelize.Op;
const exports: any = {};
import pkg from 'express';

interface Exercise {
  id?: number,
  workout_id: number,
  exercise_template_id: number,
  notes: string,
  rest_timer: number,
}

// Create and Save a new Exercise
exports.create = (req: pkg.Request, res: pkg.Response) => {
  // Validate request
  if (req.body!.workoutId == null) {
    res.status(400).send({
      message: "Content must have a workoutId!",
    });
    return;
  }

  if (req.body.exerciseTemplateId == null) {
    res.status(400).send({
      message: "Content must have a exerciseTemplateId!",
    });
    return;
  }

  // Create an exercise
  const exercise = convertToSnake(req.body);

  // Save exercise in the database
  Exercise.create(exercise)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => {
      if (err.name === 'SequelizeValidationError' || err.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).send({
          message: err.message
        });
        return;
      }
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the exercise.",
      });
    });
};

// Retrieve all Exercise from the database.
exports.findAll = (req: pkg.Request, res: pkg.Response) => {
  const id = req.query.id;
  var condition = id
    ? {
      id: {
        [Op.like]: `%${id}%`,
      },
    }
    : null;

  Exercise.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exercises.",
      });
    });
};

// Find a single exercise with an id
exports.findOne = (req: pkg.Request, res: pkg.Response) => {
  const id = req.params.id;
  Exercise.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find exercise with id ${id}. exercise may not exist.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: `Error retrieving exercise with id ${id}`,
      });
    });
};

// Update a exercise by the id in the request
exports.update = (req: pkg.Request, res: pkg.Response) => {
  const id = req.params.id;

  // Validate request
  if (!req.body.workoutId && !req.body.exerciseTemplateId && !req.body.notes && !req.body.restTimer) {
    res.status(400).send({
      message: "Content must have new data to update!",
    });
    return;
  }

  const updatedData = convertToSnake(req.body);

  Exercise.update(updatedData, {
    where: { id: id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "exercise was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update exercise with id ${id}. exercise may not exist.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: `Error updating exercise with id ${id}`,
      });
    });
};

// Delete a exercise with the specified id in the request
exports.delete = (req: pkg.Request, res: pkg.Response) => {
  const id = req.params.id;
  Exercise.destroy({
    where: { id: id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "exercise was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete exercise with id ${id}. exercise may not exist.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: `Unknown error deleting exercise with id ${id}`,
      });
    });
};

function convertToSnake(jsonData: any): Exercise {
  let exercise: Exercise = {
    workout_id: jsonData.workoutId,
    exercise_template_id: jsonData.exerciseTemplateId,
    notes: jsonData.notes,
    rest_timer: jsonData.restTimer,
  };
  return exercise;
}

export default exports;
