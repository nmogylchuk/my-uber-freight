const express = require('express');
const Load = require('../models/Load');
const Truck = require('../models/Truck');
const User = require('../models/User');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    // try {
    if (req.user.userType === 'driver') {
        if (typeof req.query.id !== "undefined") {
            const load = await Load.findOne({ _id: req.query.id });
            if (load.status === 'POSTED' || load.shippingDriver == req.user.userId) {
                res.json(load);

            }
        }

        let loads;

        if (req.query.status == 'POSTED') {
            loads = await Load.find({ status: req.query.status });
        } else {
            loads = await Load.find({ shippingDriver: req.user.userId });
        }

        let loadsRes = loads.map(function (load) {
            return {
                id: load.id,
                loadName: load.loadName,
                volume: load.volume,
                truckType: load.truckType,
                weight: load.weight,
                status: load.status
            };
        });
        res.json(loadsRes);

    }

    if (typeof req.query.id !== "undefined") {
        const load = await Load.findOne({ user: req.user.userId, _id: req.query.id });
        let loadRes = {
            _id: load._id,
            dateTo: load.dateTo,
            weight: load.weight,
            volume: load.volume,
            truckType: load.truckType,
            loadName: load.loadName,
            countryFrom: load.countryFrom,
            countryTo: load.countryTo,
            cityFrom: load.cityFrom,
            cityTo: load.cityTo,
            dateFrom: load.dateFrom,
            status: load.status,
            shippingDriver: '',
            shippingTruck: ''
        };

        if (load.status === "ASSIGN" || load.status === "SHIPPED") {
            const user = await User.findOne({ _id: load.shippingDriver });
            const truck = await Truck.findOne({ _id: load.shippingTruck });
            loadRes.shippingDriver = user.firstName + ' ' + user.lastName;
            loadRes.shippingTruck = truck.brand + ' ' + truck.model + ', ' + truck.colour;
        }
        res.json(loadRes);
    }

    const loads = await Load.find({ user: req.user.userId });

    let loadsRes = loads.map(function (load) {
        return {
            id: load.id,
            loadName: load.loadName,
            volume: load.volume,
            truckType: load.truckType,
            weight: load.weight,
            status: load.status
        };
    });

    res.json(loadsRes);
    // } catch (error) {
    //     res.status(500).json({ message: "Something went wrong" });
    // }
});

router.post('/', [
    check('loadName', 'Load Name from must contain more than 3 symbols').isLength({ min: 3 }),
    check('countryFrom', 'Country from must contain more than 3 symbols').isLength({ min: 3 }),
    check('countryTo', 'Country to must contain more than 3 symbols').isLength({ min: 3 }),
    check('cityFrom', 'City From must contain more than 3 symbols').isLength({ min: 3 }),
    check('cityTo', 'City To must contain more than 3 symbols').isLength({ min: 3 }),
    check('dateFrom', 'Date From must contain more than 3 symbols').isLength({ min: 3 }),
    check('dateTo', 'Date To must contain more than 3 symbols').isLength({ min: 3 }),
    check('weight', 'Weight must contain more than 1 symbol').isLength({ min: 1 }),
    check('volume', 'Volume must contain more than 1 symbol').isLength({ min: 1 }),
    check('truckType', 'Truck Type must contain more than 3 symbols').isLength({ min: 3 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in load fields'
            })
        }

        let { loadName, countryFrom, countryTo, cityFrom, cityTo, dateFrom, dateTo, weight, volume, truckType } = req.body;

        const load = new Load({ loadName, countryFrom, countryTo, cityFrom, cityTo, dateFrom, dateTo, weight, volume, truckType, user: req.user.userId });
        await load.save();
        res.status(201).json({ message: "The load has been created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.put('/', [
    check('loadName', 'Load Name from must contain more than 3 symbols').isLength({ min: 3 }),
    check('countryFrom', 'Country from must contain more than 3 symbols').isLength({ min: 3 }),
    check('countryTo', 'Country to must contain more than 3 symbols').isLength({ min: 3 }),
    check('cityFrom', 'City From must contain more than 3 symbols').isLength({ min: 3 }),
    check('cityTo', 'City To must contain more than 3 symbols').isLength({ min: 3 }),
    check('dateFrom', 'Date From must contain more than 3 symbols').isLength({ min: 3 }),
    check('dateTo', 'Date To must contain more than 3 symbols').isLength({ min: 3 }),
    check('weight', 'Weight must contain more than 1 symbol').isLength({ min: 1 }),
    check('volume', 'Volume must contain more than 1 symbol').isLength({ min: 1 }),
    check('truckType', 'Truck Type must contain more than 3 symbols').isLength({ min: 3 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in load fields'
            })
        }

        if (typeof req.query.id === "undefined") {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Load id is missed'
            })
        }

        let { loadName, countryFrom, countryTo, cityFrom, cityTo, dateFrom, dateTo, weight, volume, truckType } = req.body;

        const load = await Load.findOne({ user: req.user.userId, _id: req.query.id });
        if (load.status !== 'NEW') {
            return res.status(401).json({
                errors: errors.array(),
                message: 'Update load with non New status is prohibited'
            })
        }

        load.loadName = loadName;
        load.countryFrom = countryFrom;
        load.countryTo = countryTo;
        load.cityFrom = cityFrom;
        load.cityTo = cityTo;
        load.dateFrom = dateFrom;
        load.dateTo = dateTo;
        load.weight = weight;
        load.volume = volume;
        load.truckType = truckType;

        await load.save();
        res.status(201).json({ message: "The load has been updated" });
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
                message: 'Load id is missed'
            })
        }

        let { status } = req.body;

        if (req.user.userType === 'driver') {
            const load = await Load.findOne({ _id: req.query.id });

            if (status === 'ASSIGN' && load.status !== 'POSTED') {
                return res.status(401).json({
                    message: 'Unnable to update load status to ASSIGN'
                }) 
            }

            if (status === 'SHIPPED' && load.status !== 'ASSIGN') {
                return res.status(401).json({
                    message: 'Unnable to update load status to SHIPPED'
                }) 
            }

            const truck = await Truck.findOne({ user: req.user.userId, assign: true });

            load.status = status;
            load.shippingDriver = truck.user._id;
            load.shippingTruck = truck._id;
            await load.save();
            res.status(201).json({ message: "The load status has been updated" });
        }

        const load = await Load.findOne({ user: req.user.userId, _id: req.query.id });
        load.status = status;
        await load.save();
        res.status(201).json({ message: "The load status has been updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.delete('/', async (req, res) => {
    try {
        if (typeof req.query.id === "undefined") {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Load id is missed'
            })
        }

        const load = await Load.findOne({ user: req.user.userId, _id: req.query.id });
        if (load.assign) {
            return res.status(401).json({
                errors: errors.array(),
                message: 'Update assign load is not possible'
            })
        }

        Load.findOneAndDelete({ user: req.user.userId, _id: req.query.id }, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("Successful deletion");
        });

        res.status(201).json({ message: "The load has been successfully removed" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;