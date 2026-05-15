require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Puzzle = require('./models/Puzzle');

const seedPuzzles = async () => {
    try {
        await connectDB();

        await Puzzle.deleteMany({}); // Clear existing puzzles

        await Puzzle.insertMany([
            {
                description: "A billionaire beats up the mentally ill while wearing a rubber suit",
                answer: "The Dark Knight",
                difficulty: "medium",
                hint: "Batman movie"
            },
            {
                description: "A group of people fight over jewelry in New Zealand",
                answer: "The Lord of the Rings",
                difficulty: "easy",
                hint: "Ring trilogy"
            }
        ]);

        console.log('Puzzles seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding puzzles:', error.message);
        process.exit(1);
    }
};

seedPuzzles();