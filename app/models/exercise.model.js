import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Team = SequelizeInstance.define("exercise", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  workout_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  exercise_template_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  notes: {
    type: Sequelize.STRING(5000),
    allowNull: true,
  },
  rest_timer: {
    type: Sequelize.INTEGER,
    allowNull: true,
  }
  });

export default Team;
