module.exports = app => {
    const listings = require("../controllers/listing.controller.js");
  
    // Create a new listing
    app.post("/listings", listings.create);
  
    // Retrieve all listing
    app.get("/listings", listings.findAll);
  
    // Retrieve a single listing with listingId
    app.get("/listings/:listingId", listings.findOne);
  
    // Update a listing with listingId
    app.put("/listings/:listingId", listings.update);
  
    // Delete a listing with listingId
    app.delete("/listings/:listingId", listings.delete);
  
    // delete all listing
    //app.delete("/listings", listings.deleteAll);

      // Function to retrieve listings by FarmerId
    app.get("/listings/findByFarmer/:farmerId", listings.findByFarmer);

    // Function to retrieve listings by Donation (1-Donate, 0-No Donation)
    app.get("/listings/findByDonation/:donateId", listings.findByDonation);

    // Function to retrieve listings by Date 
    app.get("/listings/getTodaysListings/:date", listings.getTodaysListings);

    // Function to update availability
    app.get("/listings/setAvailability/:listingId/:isAvailable", listings.setAvailability);

    // Function to update donation
    app.get("/listings/setDonation/:listingId/:donate", listings.setDonation);
  };