const express = require('express');
const mongoose = require('mongoose');
const exerciseRoutes = require('./routes/exercises');

const app = express();

var cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost/exercise_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the Exercise API'});
});

app.use('/api/exercises', exerciseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});