import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const ExerciseTemplate = SequelizeInstance.define("exerciseTemplate", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(100),
  },
  type: {
    type: Sequelize.ENUM("strength", "cardio", "mobility", "other"),
  },
  muscle_group: {
    type: Sequelize.ENUM("bicep", "tricep", "forearm", "shoulders", "back", "chest", "core", "quad", "hamstring", "calf", "glute", "other"),
  },
});

export default ExerciseTemplate;
