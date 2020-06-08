const router = require("express").Router();

router.use("/api", require("./userRoutes"));
router.use("/api", require("./postRoutes"));
router.use("/api", require("./commentRoutes"));
router.use("/api", require("./friendRoutes"));
router.use(require("./funRoutes.js"));

module.exports = router;
