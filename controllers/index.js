const db = require('../models');

// TODO: These routes are just placeholders, the queries per request will almost definitely need modifying according to the structure of our database.

module.exports = {
    // Fridge Routes
    getFridge: function (req, res) {
        db.Fridge
            .find({user_id: req.params.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    addFridge: function (req, res) {
        db.Fridge
            .insert({
                family_id: req.body.family_id,
                user_id: req.params.id,
                items: []
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    removeFridge: function (req, res) {
        db.Fridge
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    updateFridge: function (req, res) { 
        // Update may provide better functionality when updating the list of ingredients contained within fridges. ie Load the array into this.state to render onto page => update this.state after adding or removing an item => push the new updated this.state into the database, updating the key of ingredients/products with the new one with the updated item array.
        const filter = { user_id: req.params.id}
        const update = { items: req.body }
        db.Fridge
            .findOneAndUpdate({ filter, update }) // Maybe change key to ingredients in order to update the ingredients array.
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    // User Routes
    createUser: function (req, res) {
        db.User
            .insert({
                name: req.body.name,
                family_id: req.body.family_id
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    updateUserFamily: function (req, res) {
        const filter = { user_id: req.params.id}
        const update = { family_id: req.body }
        db.User
            .findOneAndUpdate({ filter, update }) // TODO: Change to 'family_id'
            .then(dbModel => resjson(dbModel))
            .catch(err => res.status(422).json(err))
    },

    // Family Routes
    createFamily: function (req, res) {
        db.Family
            .insert({
                family_id: req.body.family_id,
                user_id: req.body.user_id
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    getFamily: function (req, res) {
        db.Family
            .find({})
            .sort({ date: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    updateFamilyMembers: function (req, res) {
        db.Family
            .findOneAndUpdate({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))

    },

    // Shopping/Grocery List Routes
    createList: function (req, res) {
        db.ShoppingList
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    getList: function (req, res) {
        db.ShoppingList
            .find({ user_id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    updateList: function (req, res) {
        const filter = { user_id: req.params.id }
        const update = { items: req.body }
        db.ShoppingList
            .findOneAndUpdate({ filter, update })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }


}