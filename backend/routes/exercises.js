const express = require('express');
const Exercise = require('../models/exercise');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;