import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const User = SequelizeInstance.define("user", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fName: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  role :{
    type: Sequelize.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
  // refresh_token: {
  //   type: Sequelize.STRING(512),
  //   allowNull: true
  // },
  // expiration_date: {
  //   type: Sequelize.DATE,
  //   allowNull: true
  // },
});

export default User;

