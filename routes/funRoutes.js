const { join } = require("path");
const axios = require("axios");
const { User } = require("../models");
const router = require("express").Router();

router.get("/", (req, res) => {
  let found = false;
  console.log(req.headers.cookie);
  if (req.headers.cookie !== undefined) {
    let temp = JSON.stringify(req.headers.cookie);
    temp = temp.split(/[.,\/ ;"]/);
    temp.forEach((item) => {
      if (item.includes("name")) {
        let temp2 = item.split("=");
        if (temp2[1] !== "undefined") {
          found = true;
        }
      }
    });
  }
  if (found) {
    res.sendFile(join(__dirname, "../public/profile.html"));
  } else {
    res.sendFile(join(__dirname, "../public/main.html"));
  }
});

module.exports = router;
