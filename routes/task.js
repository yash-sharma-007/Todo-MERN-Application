const express = require("express");
const {
  newTask,
  getMyTask,
  UpdateTask,
  DeleteTask,
} = require("../controllers/task");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser");
const { body, validationResult } = require("express-validator");

router.post(
  "/new",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  newTask
);

router.get("/fetchtask", fetchuser, getMyTask);
router
  .route("/:taskid")
  .put(fetchuser, UpdateTask)
  .delete(fetchuser, DeleteTask);

module.exports = router;
