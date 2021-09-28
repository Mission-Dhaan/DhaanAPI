module.exports = app => {
    const farmers = require("../controllers/farmer.controller.js");
  
    // Create a new farmer
    app.post("/farmers", farmers.create);
  
    // Retrieve all farmers
    app.get("/farmers", farmers.findAll);
  
    // Retrieve a single farmer with farmerId
    app.get("/farmers/:farmerId", farmers.findOne);
  
    // Update a farmer with farmerId
    app.put("/farmers/:farmerId", farmers.update);
  
    // Delete a farmer with farmerId
    app.delete("/farmers/:farmerId", farmers.delete);
  
    // delete all farmer
    //app.delete("/farmers", farmers.deleteAll);
  };