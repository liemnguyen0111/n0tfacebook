const router = require("express").Router();
const moment = require("moment");
const { Comment } = require("../models");

// Add a comment to a post - Done (Tim)
router.post("/comments", (req, res) => {
  Comment.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.error(err));
});

// Update a comment - Done (Tim)
router.put("/comments/:id", (req, res) => {
  Comment.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch((err) => console.error(err));
});

// Delete a Comment - Done (Tim)
router.delete("/comments/:id", (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch((err) => console.error(err));
});

module.exports = router;
