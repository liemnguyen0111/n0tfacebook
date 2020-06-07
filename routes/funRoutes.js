const { join } = require("path");
const router = require("express").Router();

let isLogin = false

router.get("/",  (req, res) => {

  // if(!isLogin)
  res.sendFile(join(__dirname, "../public/main.html"));
  // else 
  // res.sendFile(join(__dirname, "../public/profile.html"));

});

router.get("/test",  (req, res) => {
  res.sendFile(join(__dirname, "../public/test.html"));
});


router.get("/profile", (req, res) => {
  console.log(req.body)
  if (true) {
    res.sendFile(join(__dirname, "../public/profile.html"));
  } else{
    res.sendFile(join(__dirname, "../public/index.html"));
  }
});

module.exports = router;
