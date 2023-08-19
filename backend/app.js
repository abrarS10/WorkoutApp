const express = require('express');
const mongoose = require('mongoose');
const exerciseRoutes = require('./routes/exercises');
const config = require('./config')

const app = express();

const dbUrl = config.dbUrl;

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(dbUrl, options);

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the Exercise API'});
});

app.use('/api/exercises', exerciseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});