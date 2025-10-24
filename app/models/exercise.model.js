import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Team = SequelizeInstance.define("exercise", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
      type: Sequelize.STRING(128),
    }
  });

export default Team;
