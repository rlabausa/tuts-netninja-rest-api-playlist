/**
 * Define API routes and route logic
 */

const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// middleware to only accept/parse incoming requests as JSON
router.use(express.json());

// -- begin route definitions -- //
router.get('/ninjas', (req, res, next) => {
    Ninja.aggregate().near({
        near:
        {
            type: 'Point',
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist"
    }).then(ninjas => res.send(ninjas));
});

router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body)
        .then(ninja => {
            res.send(ninja);
        })
        .catch(next);

});

router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            Ninja.findById({ _id: req.params.id })
                .then(ninja => res.send(ninja));
        });
});

router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({ _id: req.params.id }).then(ninja => {
        res.send(ninja);
    });
});
// -- end route definitions -- //

// middleware to handle errors
router.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = router;