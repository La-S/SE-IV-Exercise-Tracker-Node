import db from "../models/index.js";
const Set = db.set;
const Op = db.Sequelize.Op;
const exports = {};

// Create and Save a new set
exports.create = (req, res) => {

    // Create a set
    const set = {
        completed: req.body.completed ?? false,
        goal_weight: req.body.goalWeight ?? null,
        actual_weight: req.body.actualWeight ?? null,
        goal_reps: req.body.goalReps ?? null,
        actual_reps: req.body.actualReps ?? null,
        goal_time: req.body.goalTime ?? null,
        actual_time: req.body.actualTime ?? null,
        goal_dist: req.body.goalDist ?? null,
        actual_dist: req.body.actualDist ?? null,
        dist_units: req.body.distUnits ?? null
    };
    // Save set in the database
    Set.create(set)
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
                        err.message || "Some error occurred while creating the set.",
                });
            }
        });
};

// Retrieve all sets from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id
        ? {
            id: {
                [Op.like]: `%${id}%`,
            },
        }
        : null;

    Set.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sets.",
            });
        });
};

// Find a single set with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Set.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find set with id ${id}. set may not exist.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving set with id ${id}`,
            });
        });
};

// Update a set by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    let updateInfo = convertToSnake(req.body)
    Set.update(updateInfo, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "set was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update set with id ${id}. set may not exist.`,
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
                    message: `Error updating set with id ${id}`,
                });
            }
        });
};

// Delete a set with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Set.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "set was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete set with id ${id}. set may not exist.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Unknown error deleting set with id ${id}`,
            });
        });
};

//have valid exerciseId checked in exercise controller?
//NOT TESTED
// exports.findForExercise = (req, res) => {
//     const exerciseId = req.query.exerciseId

//     Set.findAll({ where: { exercise_id: exerciseId } })
//         .then((data) => {
//             return data;
//         })
//         .catch((err) => {
//             throw new Error(`Error getting sets for exercise with id: ${exerciseId}`);
//         });
// };

function convertToSnake(req) {
    let updateInfo = {};
    if (req.completed) {
        updateInfo.completed = req.completed;
    }
    if (req.goalWeight) {
        updateInfo.goal_weight = req.goalWeight;
    }
    if (req.actualWeight) {
        updateInfo.actual_weight = req.actualWeight
    }
    if (req.goalReps) {
        updateInfo.goal_reps = req.goalReps;
    }
    if (req.actualReps) {
        updateInfo.actual_reps = req.actualReps;
    }
    if (req.goalDist) {
        updateInfo.goal_dist = req.goalDist;
    }
    if (req.actualDist) {
        updateInfo.actual_dist = req.actualDist;
    }
    if (req.goalTime) {
        updateInfo.goal_time = req.goalTime;
    }
    if (req.actualWeight) {
        updateInfo.actual_time = req.actualTime;
    }
    if (req.distUnits) {
        updateInfo.dist_units = req.distUnits;
    }
    return updateInfo;
}

export default exports;
