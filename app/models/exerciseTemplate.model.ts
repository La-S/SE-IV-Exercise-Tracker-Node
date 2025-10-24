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
    type: Sequelize.INTEGER,
  },
  muscle_group: {
    type: Sequelize.INTEGER,
  },
});

export default ExerciseTemplate;
