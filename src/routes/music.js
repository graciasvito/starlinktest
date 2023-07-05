var express = require("express");
var router = express.Router();
var connection = require("../../database.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM artist", function (err, rows) {
    if (err) {
      req.flash("error", err);
      res.render("list", { title: "Music", data: "" });
    } else {
      res.render("list", { title: "Music", data: rows.rows, action: "list" });
    }
  });
});

router.get("/add", function (request, response, next) {
  response.render("list", { title: "Add New Music", action: "add" });
});

// POST new music
router.post("/add-new", function (request, response, next) {
  const packagename = request.body.packagename;

  const artistname = request.body.artistname;

  const releasedate = request.body.releasedate;

  const sampleurl = request.body.sampleurl;

  const query = `
	INSERT INTO artist 
	(packagename, artistname, releasedate, sampleurl) 
	VALUES ('${packagename}', '${artistname}', '${releasedate}', '${sampleurl}')
	`;

  connection.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.redirect("/list");
    }
  });
});

// UPDATE music

router.get("/edit/:id", function (request, response, next) {
  const id = request.params.id;

  const query = `SELECT * FROM artist WHERE id = '${id}'`;

  connection.query(query, function (error, data) {
    response.render("list", {
      title: "Edit MySQL Table Data",
      action: "edit",
      id: id,
      data: data.rows,
    });
  });
});

router.post("/edit/:id", function (request, response, next) {
  const id = request.params.id;

  const packagename = request.body.packagename;

  const artistname = request.body.artistname;

  const releasedate = request.body.releasedate;

  const sampleurl = request.body.sampleurl;

  var query = `
	UPDATE artist 
	SET packagename = '${packagename}', 
	artistname = '${artistname}', 
	releasedate = '${releasedate}', 
	sampleurl = '${sampleurl}' 
	WHERE id = '${id}'
	`;

  connection.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.redirect("/list");
    }
  });
});

router.get("/delete/:id", function (request, response, next) {
  var id = request.params.id;

  var query = `
	DELETE FROM artist WHERE id = '${id}'
	`;

  connection.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.redirect("/list");
    }
  });
});

module.exports = router;
