import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Team from "./team.model.js";
import Workout from "./workout.model.js"
import Exercise from "./exercise.model.js"
import Set from "./set.model.js"
import ExerciseTemplate from "./exerciseTemplate.model.js";


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.team = Team;
db.workout = Workout;
db.exercise = Exercise;
db.set = Set;
db.exerciseTemplate = ExerciseTemplate;

//users can be on many teams and teams have many users
db.user.belongsToMany(db.team,
    { through: "TeamUser" });
db.team.belongsToMany(db.user,
    { through: "TeamUser" });

//set has many exercises
db.exercise.hasMany(db.set,
    { foreignKey: { name: "exercise_id", allowNull: false }, onDelete: "CASCADE" });
db.set.belongsTo(db.exercise,
    { as: "exercise" },
    { foreignKey: { name: "exercise_id", allowNull: false }, onDelete: "CASCADE" });

//an exercise template is used in many exercises
db.exerciseTemplate.hasMany(db.exercise,
    { foreignKey: { name: "exercise_template_id", allowNull: false }, onDelete: "CASCADE" });
db.exercise.belongsTo(db.exerciseTemplate,
    { as: "exerciseTemplate" },
    { foreignKey: { name: "exercise_template_id", allowNull: false }, onDelete: "CASCADE" });

//a workout has many exercises
db.workout.hasMany(db.exercise,
    { foreignKey: { name: "workout_id", allowNull: false }, onDelete: "CASCADE" });
db.exercise.belongsTo(db.workout,
    { as: "workout" },
    { foreignKey: { name: "workout_id", allowNull: false }, onDelete: "CASCADE" });

//two users are tied to each workout, coach and user. 
db.user.hasMany(db.workout,
    { foreignKey: { name: "user_id", allowNull: false }, onDelete: "CASCADE" });
db.workout.belongsTo(db.user,
    { as: "user" },
    { foreignKey: { name: "user_id", allowNull: false }, onDelete: "CASCADE" });
db.user.hasMany(db.workout,
    { foreignKey: "coach_id" });
db.workout.belongsTo(db.user,
    { as: "coach" },
    { foreignKey: "coach_id" });

db.sequelize.sync();
export default db;
