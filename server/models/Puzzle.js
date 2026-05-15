const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
    description: { type: String, required: true },
    answer: { type: String, required: true },
    difficulty: { type: String, required: true },
    hint: { type: String, required: true}
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;