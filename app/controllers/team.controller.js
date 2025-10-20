import db  from "../models/index.js";
const Team = db.team;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Team
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content must have a name!",
    });
    return;
  }

  // Create a Team
  const team = {
    name: req.body.name,
  };
  // Save Team in the database
  Team.create(team)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Team.",
      });
    });
};
// Retrieve all Teams from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id
    ? {
        id: {
          [Op.like]: `%${id}%`,
        },
      }
    : null;

  Team.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Teams.",
      });
    });
};

// Find a single Team with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Team.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Team with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Team with id=" + id,
      });
    });
};

// Update a Team by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content must have a name!",
    });
    return;
  }

  const updatedData = {
    name: req.body.name,
  };
  Team.update(updatedData, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Team was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Team with id=${id}. Maybe Team was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Team with id=" + id,
      });
    });
};

// Delete a Team with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Team.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Team was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Team with id=${id}. Maybe Team was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Team with id=" + id,
      });
    });
};

export default exports;
