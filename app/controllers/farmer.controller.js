const Farmer = require("../models/farmer.model.js");

// Create and Save a new farmer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a farmer
    const farmer = new Farmer({
      email: req.body.email,
      name: req.body.name,
      active: req.body.active
    });
  
    // Save farmer in the database
    Farmer.create(farmer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the farmer."
        });
      else res.send(data);
    });
  };

// Retrieve all farmers from the database.
exports.findAll = (req, res) => {
    Farmer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving farmers."
        });
      else res.send(data);
    });
  };

// Find a single farmer with a farmerId
exports.findOne = (req, res) => {
    Farmer.findById(req.params.farmerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found farmer with id ${req.params.farmerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving farmer with id " + req.params.farmerId
          });
        }
      } else res.send(data);
    });
  };

// Update a farmer identified by the farmerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Farmer.updateById(
      req.params.farmerId,
      new Farmer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found farmer with id ${req.params.farmerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating farmer with id " + req.params.farmerId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a farmer with the specified farmerId in the request
exports.delete = (req, res) => {
    Farmer.remove(req.params.farmerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found farmer with id ${req.params.farmerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete farmer with id " + req.params.farmerId
          });
        }
      } else res.send({ message: `farmer was deleted successfully!` });
    });
  };

// Delete all farmers from the database.
exports.deleteAll = (req, res) => {
    Farmer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all farmers."
        });
      else res.send({ message: `All farmers were deleted successfully!` });
    });
  };


  // Function to setAvailability 
  exports.checkUser = (req, res) => {
    Farmer.checkUser(req.params.listingId, req.params.isAvailable,(err, data) =>  {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found listing with donation.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving listing with farmerId "
          });
        }
      } else res.send(data);
    });
    };