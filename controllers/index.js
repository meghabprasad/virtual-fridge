const db = requre('../models');

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
    }
}