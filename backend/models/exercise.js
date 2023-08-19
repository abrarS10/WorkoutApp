const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: String,
    primaryMuscle: String,
    additionalMuscles: [String],
    description: String,
    equipment: [String],
    gifUrl: String,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;