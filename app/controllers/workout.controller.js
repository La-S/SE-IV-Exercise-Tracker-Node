import db from "../models/index.js";
const Workout = db.workout;
const exerciseTemplate = db.exerciseTemplate;
const Op = db.Sequelize.Op;
const User = db.user;
const exports = {};

// Create and Save a new workout
exports.create = (req, res) => {

    // Create a workout
    const workout = convertToSnake(req.body);
    // Save workout in the database
    Workout.create(workout)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            if (err.name === 'SequelizeValidationError' || err.name === "SequelizeForeignKeyConstraintError") {
                res.status(400).send({
                    message: err.message
                })
                return;
            }
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the workout.",
            });
        }
        );
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
            if (err.name === 'SequelizeValidationError' || err.name === "SequelizeForeignKeyConstraintError") {
                res.status(400).send({
                    message: err.message
                });
                return;
            }
            res.status(500).send({
                message: `Error updating workout with id ${id}`,
            });
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

exports.getExercises = async (req, res) => {
    const id = req.params.id;
    const workout = await Workout.findByPk(id);
    if (!workout) {
        res.status(404).send({ message: "workout not found!" });
        return;
    }
    workout.getExercises({ include: exerciseTemplate })
        .then((data) =>
            res.status(200).send(data))
        .catch((err) => {
            res.status(500).send({
                message: `Unknown error getting exercises`,
            });
        });
};


exports.getWorkoutsForUser = (req, res) => {
    const userId = req.params.id;
    const user = User.findByPk(userId);
    if (!user) {
        res.status(404).send({
            message: "user not found"
        })
        return;
    }
    Workout.findAll({ where: { user_id: userId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving workouts.",
            });
        });
}

exports.getUserWorkoutsDated = (req, res) => {
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let userId = req.params.id;
    const user = User.findByPk(userId);
    if (!user) {
        res.status(404).send({
            message: "user not found"
        })
        return;
    }
    Workout.findAll({ where: { user_id: userId, expected_date: { [Op.between]: [startDate, endDate] } } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving workouts.",
            });
        });
}

function convertToSnake(req) {
    let updateInfo = {};
    updateInfo.parent_id = req.parentId ?? undefined;
    updateInfo.user_id = req.userId ?? undefined;
    updateInfo.coach_id = req.coachId ?? undefined;
    updateInfo.notes = req.notes ?? undefined;
    updateInfo.expected_date = req.expectedDate ?? undefined;
    updateInfo.date = req.date ?? undefined;
    updateInfo.total_time = req.totalTime ?? undefined;
    return updateInfo;
}

export default exports;