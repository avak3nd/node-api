const express = require("express");

const getGames = require("../controllers/games/getGames");
const searchGames = require("../controllers/games/searchGames");
const createGame = require("../controllers/games/createGame");
const updateGame = require("../controllers/games/updateGame");
const deleteGame = require("../controllers/games/deleteGame");

const upload = require("../middleware/upload");

const router = express.Router();

router.get("/search", searchGames);
router.get("/tag/:tag", getGames);
router.get("/:id", getGames);
router.get("/", getGames);

router.post(
    "/",
    upload.fields([
        { name: "img", maxCount: 1 },
        { name: "img2", maxCount: 1 },
    ]),
    createGame
);

router.put(
    "/:id",
    upload.fields([
        { name: "img", maxCount: 1 },
        { name: "img2", maxCount: 1 },
    ]),
    updateGame
);

router.delete("/:id", deleteGame);

module.exports = router;