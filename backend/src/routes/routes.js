const express = require("express");

const router = express.Router();
const controller = require("../controller/controller");

router.get("/", controller.getAllNotes)

router.get("/:id", controller.getNoteById)

router.post("/", controller.createNote)

router.put("/:id", controller.updateNote)

router.delete("/:id", controller.deleteNote)

module.exports = router;