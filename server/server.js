require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateUser = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const puzzleRoutes = require('./routes/puzzleRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/puzzle', puzzleRoutes);



app.get('/', (req, res) => {
    res.send('Server is running!');
    });


app.listen(process.env.PORT || 5000, () => {
    console.log('Server is listening on port 5000');
    });