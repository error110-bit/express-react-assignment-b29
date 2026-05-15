require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

const puzzles = require('./puzzles.json');
const attempts = {}; // To track user attempts 

app.get('/', (req, res) => {
    res.send('Server is running!');
    });

app.get('/puzzle/random', (req, res) => {
    const {difficulty} = req.query;

    let filteredPuzzles = puzzles;

    // Filter puzzles by difficulty if specified
    if (difficulty) {
        filteredPuzzles = puzzles.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (filteredPuzzles.length === 0) {
        return res.status(404).json({message: 'No puzzles found for the specified difficulty'});
    }
    const randomIndex = Math.floor(Math.random() * filteredPuzzles.length);
    const puzzle = filteredPuzzles[randomIndex];

    // Exclude the answer from the response
    const {answer, hint, ...puzzleWithoutAnswer} = puzzle;

    res.json(puzzleWithoutAnswer);
    });

app.post('/puzzle/answer', (req, res) => {
    const {id, answer} = req.body;

    const puzzle = puzzles.find(p => p.id === id);

    if (!puzzle) {
        return res.status(404).json({message: 'Puzzle not found'});
    }

    if (attempts[id] === undefined) {
        attempts[id] = 0; // Initialize attempts for this puzzle
    }

    const isCorrect = puzzle.answer.toLowerCase() === answer.toLowerCase();

    if (isCorrect) {
        attempts[id] = 0; // Reset attempts on correct answer
        return res.json({message: 'Correct answer!'});
    } else {
        attempts[id]++; // Increment attempts for this puzzle
        return res.json({message: 'Incorrect answer. Try again!', attempts: attempts[id], hintAvailable: attempts[id] >= 3});
    }
});

app.get('/puzzle/hint/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const puzzle = puzzles.find(p => p.id === id);

    if (!puzzle) {
        return res.status(404).json({message: 'Puzzle not found'});
    }

    if (attempts[id] === undefined || attempts[id] < 3) {
        return res.status(403).json({message: 'Hint not available yet. Please attempt the puzzle at least 3 times.'});
    }

    res.json({hint: puzzle.hint});
});


app.listen(process.env.PORT || 5000, () => {
    console.log('Server is listening on port 5000');
    });