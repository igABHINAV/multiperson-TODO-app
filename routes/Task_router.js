const express = require("express");
const { getAllPostsByUser, getTaskbyId, createTask, updateTask, deleteTask } = require("../controllers/Task_controller");
const router = express.Router();
router.route("/tasks").get(getAllPostsByUser);
router.route("/tasks/:id").get(getTaskbyId);
router.route("/tasks").post(createTask);
router.route("/tasks/:id").put(updateTask);
router.route("/tasks/:id").delete(deleteTask);
module.exports = router;