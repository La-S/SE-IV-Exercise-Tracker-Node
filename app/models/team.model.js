import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Team = SequelizeInstance.define("team", {
    team_name: {
      type: Sequelize.STRING(128),
    }
  });

export default Team;
