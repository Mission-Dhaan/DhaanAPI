const sql = require("./db.js");

// constructor
const Listing = function(listing) {
  this.farmerId = listing.farmerId;
  this.productId = listing.productId;
  this.location = listing.location;
  this.donate = listing.donate;
  this.isAvailable = listing.isAvailable;
  this.createDate = listing.createDate;
};

Listing.create = (newListing, result) => {
  sql.query("INSERT INTO listing SET ?", newListing, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newListing });
    result(null, { id: res.insertId, ...newListing });
  });
};

Listing.findById = (listingId, result) => {
  sql.query(`SELECT * FROM listing WHERE id = ${listingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found listing: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found listing with the id
    result({ kind: "not_found" }, null);
  });
};

Listing.getAll = result => {
  sql.query("SELECT * FROM listing", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};

Listing.updateById = (id, listing, result) => {
  sql.query(
    "UPDATE listing SET farmerId = ?, productId = ?, location = ?, donate = ?, isAvailable =? WHERE id = ?",
    [listing.farmerId, listing.productId, listing.location, listing.donate,listing.isAvailable, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found listing with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated listing: ", { id: id, ...listing });
      result(null, { id: id, ...listing });
    }
  );
};

Listing.remove = (id, result) => {
  sql.query("DELETE FROM listing WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found listing with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted listing with id: ", id);
    result(null, res);
  });
};

Listing.removeAll = result => {
  sql.query("DELETE FROM listing", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} listings`);
    result(null, res);
  });
};

Listing.getByFarmer = (id, result) => {
  sql.query("SELECT products.* FROM  farmers,  products WHERE  products.farmerId = farmers.id   AND farmers.id = ?;", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};

Listing.getByDonation =  (donateId, result) => {
  sql.query("SELECT `listing`.`location`, `products`.`name` AS productName, `products`.`quantity`, `products`.`price`, `products`.`organic`, `products`.`hfrip`, `farmers`.`name` AS farmerName FROM `listing`, `products`, `farmers` WHERE  `listing`.`donate` = ? AND `listing`.`isAvailable` = 1 AND `listing`.`productId` = `products`.`id` AND `farmers`.`id` = `products`.`farmerId`;", donateId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};


Listing.getTodaysListings = (paramDate, result) => {
  sql.query("SELECT `products`.*, `listing`.* FROM `listing`, `products` WHERE `listing`.`createDate` LIKE ? AND `products`.`id` = `listing`.`productId`;", paramDate+"%", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};


Listing.updateById = (id, listing, result) => {
  sql.query(
    "UPDATE listing SET farmerId = ?, productId = ?, location = ?, donate = ?, isAvailable =? WHERE id = ?",
    [listing.farmerId, listing.productId, listing.location, listing.donate,listing.isAvailable, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found listing with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated listing: ", { id: id, ...listing });
      result(null, { id: id, ...listing });
    }
  );
};


Listing.setAvailability = (id, isAvailable, result) => {
  sql.query("UPDATE listing SET isAvailable = ? where id = ?", [isAvailable, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};


Listing.setDonation = (id, donate, result) => {
  sql.query("UPDATE listing SET donate = ? where id = ?", [donate, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("listings: ", res);
    result(null, res);
  });
};
module.exports = Listing;
