const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // ????
const personsController = require("../controllers/persons");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


router.get("/:id", ensureAuth, personsController.getPersonById);

router.post("/createPerson",  personsController.createPerson);

// router.put("/:id", personsController.updatePerson) TODO later

router.delete("/deletePerson/:id", personsController.deletePerson);


module.exports = router;