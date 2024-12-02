// Define Mongoose Schema and Model
const { model, Schema } = require('mongoose')

// Synergy Schema
const synergySchema = new Schema({
    top: {
        type: [String],
        default: []
    },
    jungle: {
        type: [String],
        default: []
    },
    mid: {
        type: [String],
        default: []
    },
    adc: {
        type: [String],
        default: []
    },
    support: {
        type: [String],
        default: []
    }
});

// Champion Schema
const championSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lane: {
        type: String,
        default: ''
    },
    counter: {
        type: [String],
        default: []
    },
    scale: {
        type: [Number],
        default: []
    },
    synergy: {
        type: synergySchema,
        default: () => ({}) // Empty default object
    }
});

// Create and export the Champion model
const Champion = model('Champion', championSchema);

module.exports = Champion;