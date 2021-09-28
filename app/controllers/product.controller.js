const Product = require("../models/product.model.js");

// Create and Save a new product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a product
    const product = new Product({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      organic: req.body.organic,
      location: req.body.location,
      hfrip: req.body.hfrip,
      farmerId: req.body.farmerId
    });
  
    // Save product in the database
    Product.create(product, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      else res.send(data);
    });
  };

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      else res.send(data);
    });
  };

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
          });
        }
      } else res.send(data);
    });
  };

// Update a product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Product.updateById(
      req.params.productId,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found product with id ${req.params.productId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating product with id " + req.params.productId
            });
          }
        } else res.send(data);
      }
    );
  };
// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
          });
        }
      } else res.send({ message: `product was deleted successfully!` });
    });
  };

// Delete all products from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all products."
        });
      else res.send({ message: `All products were deleted successfully!` });
    });
  };
