const sql = require("./db.js");

// constructor
const Farmer = function(farmer) {
  this.email = farmer.email;
  this.name = farmer.name;
  this.active = farmer.active;
};

Farmer.create = (newFarmer, result) => {
  sql.query("INSERT INTO farmers SET ?", newFarmer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created farmer: ", { id: res.insertId, ...newFarmer });
    result(null, { id: res.insertId, ...newFarmer });
  });
};

Farmer.findById = (farmerId, result) => {
  sql.query(`SELECT * FROM farmers WHERE id = ${farmerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found farmer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found farmer with the id
    result({ kind: "not_found" }, null);
  });
};

Farmer.getAll = result => {
  sql.query("SELECT * FROM farmers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("farmers: ", res);
    result(null, res);
  });
};

Farmer.updateById = (id, farmer, result) => {
  sql.query(
    "UPDATE farmers SET email = ?, name = ?, active = ? WHERE id = ?",
    [farmer.email, farmer.name, farmer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found farmer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated farmer: ", { id: id, ...farmer });
      result(null, { id: id, ...farmer });
    }
  );
};

Farmer.remove = (id, result) => {
  sql.query("DELETE FROM farmers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found farmer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted farmer with id: ", id);
    result(null, res);
  });
};

Farmer.removeAll = result => {
  sql.query("DELETE FROM farmers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} farmers`);
    result(null, res);
  });
};



module.exports = Farmer;
