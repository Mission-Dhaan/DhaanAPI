const Listing = require("../models/listing.model.js");

// Create and Save a new listing
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a listing
    const listing = new Listing({
      farmerId: req.body.farmerId,
      productId: req.body.productId,
      location: req.body.location,
      donate: req.body.donate,
      isAvailable: req.body.isAvailable,
      createDate: req.body.createDate
    });
  
    // Save listing in the database
    Listing.create(listing, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the listing."
        });
      else res.send(data);
    });
  };

// Retrieve all listing from the database.
exports.findAll = (req, res) => {
  Listing.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving listing."
        });
      else res.send(data);
    });
  };

// Find a single listing with a listingId
exports.findOne = (req, res) => {
  Listing.findById(req.params.listingId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found listing with id ${req.params.listingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving listing with id " + req.params.listingId
          });
        }
      } else res.send(data);
    });
  };

// Update a listing identified by the listingId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Listing.updateById(
      req.params.listingId,
      new Listing(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found listing with id ${req.params.listingId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating listing with id " + req.params.listingId
            });
          }
        } else res.send(data);
      }
    );
  };
  
// Delete a listing with the specified listingId in the request
exports.delete = (req, res) => {
  Listing.remove(req.params.listingId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found listing with id ${req.params.listingId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete listing with id " + req.params.listingId
          });
        }
      } else res.send({ message: `listing was deleted successfully!` });
    });
  };

// Delete all listing from the database.
exports.deleteAll = (req, res) => {
  Listing.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all listing."
        });
      else res.send({ message: `All listing were deleted successfully!` });
    });
  };

// Function to retrieve listings by Farmer ID
exports.findByFarmer = (req, res) => {
  Listing.getByFarmer(req.params.farmerId, (err, data) =>  {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found listing with farmerId ${req.params.farmerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving listing with farmerId " + req.params.farmerId
        });
      }
    } else res.send(data);
  });
  };

  // Function to retrieve listings by Donation
exports.findByDonation = (req, res) => {
  Listing.getByDonation(req.params.donateId, (err, data) =>  {
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

    // Function to retrieve listings by Donation
exports.getTodaysListings = (req, res) => {
  Listing.getTodaysListings(req.params.date, (err, data) =>  {
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

  // Function to setAvailability 
  exports.setAvailability = (req, res) => {
    Listing.setAvailability(req.params.listingId, req.params.isAvailable,(err, data) =>  {
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


     // Function to setDonation 
  exports.setDonation = (req, res) => {
    Listing.setDonation(req.params.listingId, req.params.donate,(err, data) =>  {
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