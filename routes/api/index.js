const router = require("express").Router();
const dbControllers = require("../../controllers");
////////////////
// Fridge routes
////////////////

// /api/fridge/
router.route("/fridge")
    .get(dbControllers.getFridge)
    .post(dbControllers.addFridge);


// /api/fridge/:id
router.route("/fridge/:id")
    .put(dbControllers.updateFridge)
    .delete(dbControllers.removeFridge);

///////////////
// User Routes
///////////////

// /api/newuser
router.route("/newuser")
    .post(dbControllers.createUser)
    .put(dbControllers.updateUserFamily)


/////////////////
// Family Routes
/////////////////

// /api/family
router.route("/family")
    .post(dbControllers.createFamily)
    .get(dbControllers.getFamily)


// /api/family/:id
router.route("/family/:id")
    .put(dbControllers.updateFamilyMembers)


module.exports = router;