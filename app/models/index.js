import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Team from "./team.model.js";
import Workout from "./workout.model.js"
import Exercise from "./exercise.model.js"
import Set from "./set.model.js"
import ExerciseTemplate from "./exerciseTemplate.model.ts";


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
    { through: "TeamUser" }
);
db.team.belongsToMany(db.user,
    { through: "TeamUser" }
);

//set has many exercises
db.exercise.hasMany(db.set, { foreignKey: "exercise_id" })
db.set.belongsTo(db.exercise,
    { foreignKey: { name: "exercise_id", allowNull: false } }
);

//an exercise template is used in many exercises
db.exerciseTemplate.hasMany(db.exercise, { foreignKey: "exercise_template_id" });
db.exercise.belongsTo(db.exerciseTemplate,
    { foreignKey: { name: "exercise_template_id", allowNull: false } }
);

//a workout has many exercises
db.workout.hasMany(db.exercise, { foreignKey: "workout_id" });
db.exercise.belongsTo(db.workout,
    { foreignKey: { name: "workout_id", allowNull: false } }
);

//two users are tied to each workout, coach and user. 
db.user.hasMany(db.workout, { foreignKey: "user_id" });
db.workout.belongsTo(db.user, { foreignKey: { name: "user_id", allowNull: false } });
db.user.hasMany(db.workout, { foreignKey: "coach_id" });
db.workout.belongsTo(db.user, { foreignKey: "coach_id" });



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

db.sequelize.sync({ force: true });
export default db;
