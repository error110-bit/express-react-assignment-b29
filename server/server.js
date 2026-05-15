require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

connectDB();

app.use(express.json());

const Puzzle = require('./models/Puzzle');
const User = require('./models/User');

const attempts = {}; // To track user attempts 

app.get('/', (req, res) => {
    res.send('Server is running!');
    });

app.get('/puzzle/random', async (req, res) => {
    try {
         const {difficulty} = req.query;

         let query = {};

         if (difficulty) {
             query.difficulty = difficulty.toLowerCase();

         }

        const puzzles = await Puzzle.find(query).lean();


        if (puzzles.length === 0) {
            return res.status(404).json({message: 'No puzzles found for the specified difficulty'});
        }

        const randomIndex = Math.floor(Math.random() * puzzles.length);
        const randomPuzzle = puzzles[randomIndex];

        res.json({
            id: randomPuzzle._id,
            description: randomPuzzle.description,
            difficulty: randomPuzzle.difficulty
        });
       
    } catch (error) {
        console.error('Error fetching puzzle:', error.message);
        res.status(500).json({message: 'Server error'});
    }
});

app.post('/auth/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


app.post('/puzzle/answer', async (req, res) => {
    try {
        const { id, answer } = req.body;

        const puzzle = await Puzzle.findById(id);

        if (!puzzle) {
            return res.status(404).json({
                message: 'Puzzle not found'
            });
        }

        if (attempts[id] === undefined) {
            attempts[id] = 0;
        }

        const isCorrect =
            puzzle.answer.toLowerCase().trim() === answer.toLowerCase().trim();

        if (isCorrect) {
            attempts[id] = 0;

            return res.json({
                correct: true,
                message: 'Correct answer!'
            });
        }

        attempts[id]++;

        res.json({
            correct: false,
            attempts: attempts[id],
            hintAvailable: attempts[id] >= 3
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


app.get('/puzzle/hint/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const puzzle = await Puzzle.findById(id);

        if (!puzzle) {
            return res.status(404).json({message: 'Puzzle not found'});
    }

        if (attempts[id] === undefined || attempts[id] < 3) {
            return res.status(403).json({message: 'Hint not available yet. Please attempt the puzzle at least 3 times.'});
    }

        res.json({hint: puzzle.hint});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


app.listen(process.env.PORT || 5000, () => {
    console.log('Server is listening on port 5000');
    });