const express = require('express');
const Truck = require('../models/Truck');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
        if (typeof req.query.id === "undefined") {
            const trucks = await Truck.find({ user: req.user.userId });
            res.json(trucks);
        } else {
            const truck = await Truck.findOne({ user: req.user.userId, _id: req.query.id });
            res.json(truck);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/', [
    check('brand', 'Brand must contain more than 3 symbols').isLength({ min: 3 }),
    check('model', 'Model must contain more than 3 symbols').isLength({ min: 3 }),
    check('year', 'Year must contain 4 symbols').isLength({ min: 4 }),
    check('colour', 'Colour must contain more than 3 symbols').isLength({ min: 3 }),
    check('gearbox', 'Geabox must contain more than 3 symbols').isLength({ min: 3 }),
    check('engine', 'Engine must contain more than 3 symbols').isLength({ min: 3 }),
    check('mileage', 'Mileage must contain more than 1 symbol').isLength({ min: 1 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in truck fields'
            })
        }

        let { brand, model, year, colour, gearbox, engine, mileage } = req.body;

        const truck = new Truck({ brand, model, year, colour, gearbox, engine, mileage, user: req.user.userId });
        await truck.save();
        res.status(201).json({ message: "The truck has been created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.put('/', [
    check('brand', 'Brand must contain more than 3 symbols').isLength({ min: 3 }),
    check('model', 'Model must contain more than 3 symbols').isLength({ min: 3 }),
    check('year', 'Year must contain 4 symbols').isLength({ min: 4 }),
    check('colour', 'Colour must contain more than 3 symbols').isLength({ min: 3 }),
    check('gearbox', 'Geabox must contain more than 3 symbols').isLength({ min: 3 }),
    check('engine', 'Engine must contain more than 3 symbols').isLength({ min: 3 }),
    check('mileage', 'Mileage must contain more than 1 symbol').isLength({ min: 1 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in truck fields'
            })
        }

        if (typeof req.query.id === "undefined") {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Truck id is missed'
            })
        }

        let { brand, model, year, colour, gearbox, engine, mileage } = req.body;

        const truck = await Truck.findOne({ user: req.user.userId, _id: req.query.id });
        if (truck.assign) {
            return res.status(401).json({
                errors: errors.array(),
                message: 'Update assign truck is not possible'
            })
        }

        truck.brand = brand;
        truck.model = model;
        truck.year = year;
        truck.colour = colour;
        truck.gearbox = gearbox;
        truck.engine = engine;
        truck.mileage = mileage;
        await truck.save();
        res.status(201).json({ message: "The truck has been updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.patch('/', async (req, res) => {
    try {
        if (typeof req.query.id === "undefined") {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Truck id is missed'
            })
        }

        let { assign } = req.body;

        const truck = await Truck.findOne({ user: req.user.userId, _id: req.query.id });
        truck.assign = assign;
        await truck.save();
        res.status(201).json({ message: "The truck status has been updated" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.delete('/', async (req, res) => {
    try {
        if (typeof req.query.id === "undefined") {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Truck id is missed'
            })
        }

        const truck = await Truck.findOne({ user: req.user.userId, _id: req.query.id });
        if (truck.assign) {
            return res.status(401).json({
                errors: errors.array(),
                message: 'Update assign truck is not possible'
            })
        }

        Truck.findOneAndDelete({ user: req.user.userId, _id: req.query.id }, function (err) {
            if(err) {
                console.log(err);
            }
            console.log("Successful deletion");
          });

        res.status(201).json({ message: "The truck has been successfully removed" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;