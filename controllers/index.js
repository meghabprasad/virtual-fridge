const db = requre('../models');

// TODO: These routes are just placeholders, the queries per request will almost definitely need modifying according to the structure of our database.

module.exports = {
    getFridge: function (req, res) {
        db.Fridge
            .find(req.query)
            .sort({ date: -1 }) // Sorts by recently added first
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    addToFridge: function (req, res) {
        db.Fridge
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    removeFromFridge: function (req, res) {
        db.Fridge
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    updateFridge: function (req, res) { // Update may provide better functionality when updating the list of ingredients contained within fridges. ie Load the array into this.state to render onto page => update this.state after adding or removing an item => push the new updated this.state into the database, updating the key of ingredients/products with the new one with the updated item array.
        db.Fridge
            .findOneandUpdate({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }

}