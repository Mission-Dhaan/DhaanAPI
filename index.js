// index.js

/**
 * Required External Modules
 */

const express = require("express");
const bodyParser = require("body-parser");
var axios = require('axios');

const path = require("path");

const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require("dotenv").config();

const authRouter = require("./auth");


/* Routers */

const farmers = require("./app/controllers/farmer.controller.js");
const listings = require("./app/controllers/listing.controller.js");
const products = require("./app/controllers/product.controller.js");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Session Configuration
 */

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
};

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

// index.js

/**
 * Passport Configuration
 */

/**
 * Passport Configuration
 */

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
);

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Creating custom middleware with Express
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Router mounting
app.use("/", authRouter);

/**
 * Routes Definitions
 */

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

//HOME
app.get("/home", secured, (req, res) => {
  axios.get('http://localhost:3000/checkUser')
  .then(response => {
    console.log(response.data);
    res.render("home", { title: "Home", data: response.data });
  })
  .catch(error => {
    console.log(error);
  });  
  res.render("index", { title: "Home" });
});

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/user", secured, (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("user", {
    title: "Profile",
    userProfile: userProfile
  });
});


// Create a new farmer
app.post("/farmers", secured, farmers.create);
  
// Retrieve all farmers

app.get("/getfarmers", (req, res, next) => {
  
  axios.get('http://localhost:3000/farmers')
  .then(response => {
    console.log(response.data);
    res.render("farmer", { title: "Home", data: response.data });
  })
  .catch(error => {
    console.log(error);
  });  
});

app.get("/farmers", farmers.findAll);

//app.get("/farmers", secured, farmers.findAll);

// Retrieve a single farmer with farmerId
app.get("/farmers/:farmerId", secured, farmers.findOne);

// Update a farmer with farmerId
app.put("/farmers/:farmerId", secured, farmers.update);

// Delete a farmer with farmerId
app.delete("/farmers/:farmerId", secured, farmers.delete);

// delete all farmer
//app.delete("/farmers", farmers.deleteAll);

// Create a new listing
app.post("/listings", secured, listings.create);
  
// Retrieve all listing
app.get("/listings", secured, listings.findAll);

// Retrieve a single listing with listingId
app.get("/listings/:listingId", secured, listings.findOne);

// Update a listing with listingId
app.put("/listings/:listingId", secured, listings.update);

// Delete a listing with listingId
app.delete("/listings/:listingId", secured, listings.delete);

// delete all listing
//app.delete("/listings", listings.deleteAll);

  // Function to retrieve listings by FarmerId
app.get("/listings/findByFarmer/:farmerId", secured, listings.findByFarmer);

// Function to retrieve listings by Donation (1-Donate, 0-No Donation)
app.get("/listings/findByDonation/:donateId", secured, listings.findByDonation);

// Function to retrieve listings by Date 
app.get("/listings/getTodaysListings/:date", secured, listings.getTodaysListings);

// Function to update availability
app.get("/listings/setAvailability/:listingId/:isAvailable", secured, listings.setAvailability);

// Function to update donation
app.get("/listings/setDonation/:listingId/:donate", secured, listings.setDonation);

// Create a new product
app.post("/products", secured, products.create);
  
// Retrieve all products
app.get("/products", secured, products.findAll);

// Retrieve a single product with productId
app.get("/products/:productId", secured, products.findOne);

// Update a product with productId
app.put("/products/:productId", secured, products.update);

// Delete a product with productId
app.delete("/products/:productId", secured, products.delete);

// delete all product
//app.delete("/products", products.deleteAll);


/**
 * Server Activation
 */

 
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});