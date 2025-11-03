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

// foreign key for session
// leaving these here as examples for object relations - John
// db.user.hasMany(
//   db.session,
//   { as: "session" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.session.belongsTo(
//   db.user,
//   { as: "user" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

// foreign key for teams
// db.team.hasMany

// // foreign key for tutorials
// db.user.hasMany(
//   db.tutorial,
//   { as: "tutorial" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.tutorial.belongsTo(
//   db.user,
//   { as: "user" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

// // foreign key for lessons
// db.tutorial.hasMany(
//   db.lesson,
//   { as: "lesson" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.lesson.belongsTo(
//   db.tutorial,
//   { as: "tutorial" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

db.sequelize.sync();
export default db;
