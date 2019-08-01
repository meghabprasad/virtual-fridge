const router = require("express").Router();
const dbControllers = require("../../controllers");

// Fridge routes
router.route("/fridge")
    .get(dbControllers.getFridge)
    .post(dbControllers.addFridge);

router.route("/fridge/:id")
    .put(dbControllers.updateFridge)
    .delete(dbControllers.removeFridge);

// User Routes
router.route("/newuser")
    .post(dbControllers.createUser)
    .put(dbControllers.updateUserFamily)

// Family Routes
router.route("/family")
    .post(dbControllers.createFamily)
    .get(dbControllers.getFamily)


router.route("/family/:id")
    .put(dbControllers.updateFamilyMembers)


module.exports = router;