const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: String, required: true},
    colour: {type: String, required: true},
    gearbox: {type: String, required: true},
    engine: {type: String, required: true},
    mileage: {type: Number, required: true},
    assign: {type: Boolean, default: false},
    time: {type: Date, default: Date.now},
    user: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Truck', schema);