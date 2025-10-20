import db  from "../models/index.js";
const Team = db.team;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Team
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Team
  const team = {
    teamId: req.params.teamId,
    team_name: req.body.teamName,
  };
  // Save Team in the database
  Team.create(team)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lesson.",
      });
    });
};
// Retrieve all Teams from the database.
exports.findAll = (req, res) => {
  const teamId = req.query.teamId;
  var condition = teamId
    ? {
        teamId: {
          [Op.like]: `%${teamId}%`,
        },
      }
    : null;

  Team.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};

export default exports;
