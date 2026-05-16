const express = require('express');
const Puzzle = require('../models/Puzzle');
const User = require('../models/User');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

const attempts = {};


router.get('/random', async (req, res) => {
    try {
        const { difficulty } = req.query;

        let query = {};

        if (difficulty) {
            query.difficulty = difficulty.toLowerCase();
        }

        const puzzles = await Puzzle.find(query);

        if (puzzles.length === 0) {
            return res.status(404).json({
                message: 'No puzzles found'
            });
        }

        const randomIndex = Math.floor(Math.random() * puzzles.length);
        const puzzle = puzzles[randomIndex];

        res.json({
            id: puzzle._id,
            description: puzzle.description,
            difficulty: puzzle.difficulty
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post('/answer', authenticateUser, async (req, res) => {
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

            const user = await User.findById(req.user.userId);

            const alreadySolved = user.solvedPuzzles.includes(id);

            if (!alreadySolved) {
                user.solvedPuzzles.push(id);
                user.score += 1;
                await user.save();
            }

            return res.json({
                correct: true,
                message: alreadySolved
                    ? 'Correct answer! Puzzle already solved before.'
                    : 'Correct answer! Score updated.'
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

router.get('/hint/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const puzzle = await Puzzle.findById(id);

        if (!puzzle) {
            return res.status(404).json({
                message: 'Puzzle not found'
            });
        }

        if (attempts[id] === undefined || attempts[id] < 3) {
            return res.status(403).json({
                message: 'Hint not available yet. Please attempt the puzzle at least 3 times.'
            });
        }

        res.json({
            hint: puzzle.hint
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find()
            .sort({ score: -1 })
            .select('username score');

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;