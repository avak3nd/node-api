const express = require("express");

const getGames = require("../controllers/games/getGames");
const createGame = require("../controllers/games/createGame");
const updateGame = require("../controllers/games/updateGame");
const deleteGame = require("../controllers/games/deleteGame");

const router = express.Router();

router.get("/tag/:tag", getGames);
router.get("/:id", getGames);
router.get("/", getGames);

router.post("/", createGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

module.exports = router;