import db from "../models/index.js";
const User = db.user;
const Op = db.Sequelize.Op;
const exports = {};
const missingAttr = "Missing attribute: "
const invalidRole = "Invalid role entered. user or admin are acceptable roles."
// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  let attributeError = validateAttributes(req.body)
  if (attributeError) {
    res.status(400).send({ message: attributeError })
    return;
  }
  if (await getUserForEmail(req.body.email)){
    res.status(409).send({ message: `user with email ${req.body.email} already exists. Use a different email.`});
    return;
  }

  // Create a User
  const user = {
    id: req.body.id,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    role: req.body.role ?? "user",
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  if (!validateRole(req.body.role)) {
    res.status(400).send({ message: invalidRole })
    return;
  }
  let userForEmail = await getUserForEmail(req.body.email)
  let userForId = await getUserForId(id)
    if (!userForId)
    {
      res.status(404).send({message: `user for id ${id} not found.`});
      return;
    }
  if (userForEmail && (JSON.stringify(userForEmail) !== JSON.stringify(userForId))){
    res.status(409).send({ message: `user with email ${req.body.email} already exists. Use a different email.`});
    return;
  }
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  let userForId = await getUserForId(id)
    if (!userForId)
    {
      res.status(404).send({message: `user for id ${id} not found.`});
      return;
    }

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

function validateAttributes(req) {
  if (!req.fName)
    return missingAttr + "fName";
  if (!req.lName)
    return missingAttr + "lName";
  if (!req.email)
    return missingAttr + "email";
  if (!validateRole(req.role))
    return invalidRole
}

async function validateRole(role) {
  if (role && !(role === "user" || role === "admin"))
    return false
  return true;
}
function getUserForEmail(email){
   return User.findOne({
    where: {
      email: email,
    },
  });
}
async function getUserForId(id){
  return User.findByPk(id);
}
export default exports;
