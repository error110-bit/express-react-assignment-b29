require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

const Puzzle = require('./models/Puzzle');
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