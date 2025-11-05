import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Workout = SequelizeInstance.define("workout", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    parent_id: {
        type: Sequelize.INTEGER
    },
    notes: {
        type: Sequelize.STRING(500)
    },
    expected_date: {
        type: Sequelize.DATE
    },
    date: {
        type: Sequelize.DATE
    },
    total_time: {
        type: Sequelize.INTEGER
    }
});

export default Workout;