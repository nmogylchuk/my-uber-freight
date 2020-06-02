const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    loadName: { type: String, required: true },
    countryFrom: { type: String, required: true },
    countryTo: { type: String, required: true },
    cityFrom: { type: String, required: true },
    cityTo: { type: String, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, default: false },
    weight: { type: String, default: false },
    volume: { type: Number, default: false },
    truckType: { type: String, default: false },
    status: { type: String, default: 'NEW' },
    shippingDriver: { type: Types.ObjectId, ref: 'User' },
    shippingTruck: { type: Types.ObjectId, ref: 'Truck' },
    time: { type: Date, default: Date.now },
    user: { type: Types.ObjectId, ref: 'User' }
});

module.exports = model('Load', schema);