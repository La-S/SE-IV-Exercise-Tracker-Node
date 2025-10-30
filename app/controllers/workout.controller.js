import db from "../models/index.js";
const Workout = db.workout;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new workout
exports.create = (req, res) => {

    // Create a workout
    const workout = {
        parent_id: req.body.parentId ?? null,
        user_id: req.body.userId,
        coach_id: req.body.coachId ?? null,
        notes: req.body.notes ?? null,
        expected_date: req.body.expectedDate ?? null,
        date: req.body.date ?? null,
        total_time: req.body.totalTime ?? 0
    };
    // Save workout in the database
    Workout.create(workout)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                res.status(400).send({
                    message: err.message
                })
            }
            else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the workout.",
                });
            }
        });
};

// Retrieve all workouts from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id
        ? {
            id: {
                [Op.like]: `%${id}%`,
            },
        }
        : null;

    Workout.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving workouts.",
            });
        });
};

// Find a single workout with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Workout.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find workout with id ${id}. workout may not exist.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving workout with id ${id}`,
            });
        });
};

// Update a workout by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    let updateInfo = convertToSnake(req.body)
    Workout.update(updateInfo, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "workout was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update workout with id ${id}. workout may not exist.`,
                });
            }
        })
        .catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                res.status(400).send({
                    message: err.message
                })
            }
            else {
                res.status(500).send({
                    message: `Error updating workout with id ${id}`,
                });
            }
        });
};

// Delete a workout with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Workout.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "workout was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete workout with id ${id}. workout may not exist.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Unknown error deleting workout with id ${id}`,
            });
        });
};

//have valid exerciseId checked in exercise controller?
//NOT TESTED
// exports.findForExercise = (req, res) => {
//     const exerciseId = req.query.exerciseId

//     Workout.findAll({ where: { exercise_id: exerciseId } })
//         .then((data) => {
//             return data;
//         })
//         .catch((err) => {
//             throw new Error(`Error getting workouts for exercise with id: ${exerciseId}`);
//         });
// };

function convertToSnake(req) {
    let updateInfo = {};
    updateInfo.completed = req.completed ?? undefined;
    updateInfo.goal_weight = req.goalWeight ?? undefined;
    updateInfo.actual_weight = req.actualWeight ?? undefined;
    updateInfo.goal_reps = req.goalReps ?? undefined;
    updateInfo.actual_reps = req.actualReps ?? undefined;
    updateInfo.goal_dist = req.goalDist ?? undefined;
    updateInfo.actual_dist = req.actualDist ?? undefined;
    updateInfo.goal_time = req.goalTime ?? undefined;
    updateInfo.actual_time = req.actualTime ?? undefined;
    updateInfo.dist_units = req.distUnits ?? undefined;
    return updateInfo;
}

export default exports;