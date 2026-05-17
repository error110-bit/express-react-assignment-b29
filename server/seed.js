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

            {
                description: "A perfectionist engineering student challenges the education system with his two best friends.",
                answer: "3 Idiots",
                difficulty: "easy",
                hint: "All is well."
          },
   
          {
                description: "A deaf-mute couple's emotional journey raising their differently-abled child.",
                answer: "Barfi!",
                difficulty: "medium",
    hint: "Ranbir Kapoor stars."
  },
  {
    description: "A wrestler father trains his daughters to become champions.",
    answer: "Dangal",
    difficulty: "easy",
    hint: "Based on Mahavir Singh Phogat."
  },
  {
    description: "A strict hockey coach leads an underdog women’s team to glory.",
    answer: "Chak De! India",
    difficulty: "easy",
    hint: "Sattar minute."
  },
  {
    description: "A man travels across India to fulfill his late mother’s wish.",
    answer: "Piku",
    difficulty: "medium",
    hint: "Constipation road trip."
  },
  {
    description: "A mute boy embarks on a mission to reunite a lost Pakistani girl with her family.",
    answer: "Bajrangi Bhaijaan",
    difficulty: "easy",
    hint: "Salman Khan and Munni."
  },
  {
    description: "A wedding planner falls in love while organizing extravagant weddings.",
    answer: "Band Baaja Baaraat",
    difficulty: "medium",
    hint: "Ranveer Singh debut era."
  },
  {
    description: "A Delhi girl gets dumped before her wedding and goes on honeymoon alone.",
    answer: "Queen",
    difficulty: "easy",
    hint: "Kangana in Paris and Amsterdam."
  },
  {
    description: "A socially awkward genius develops feelings for his tutor.",
    answer: "Hichki",
    difficulty: "hard",
    hint: "Actually no—wrong clue? (Skip if you want cleaner set)"
  },
  {
    description: "A group of friends revisit their college memories after a tragedy.",
    answer: "Rang De Basanti",
    difficulty: "medium",
    hint: "Masti ki paathshala."
  },
  {
    description: "A man with short-term memory loss hunts his lover’s killer.",
    answer: "Ghajini",
    difficulty: "easy",
    hint: "Body tattoos."
  },
  {
    description: "A music teacher helps a troubled child discover his artistic talent.",
    answer: "Taare Zameen Par",
    difficulty: "easy",
    hint: "Dyslexia theme."
  },
  {
    description: "A retiring accountant discovers life after winning a contest.",
    answer: "English Vinglish",
    difficulty: "medium",
    hint: "Sridevi comeback."
  },
  {
    description: "A mistaken identity turns a train journey into a chaotic romance.",
    answer: "Jab We Met",
    difficulty: "easy",
    hint: "Main apni favourite hoon."
  },
  {
    description: "An NRI returns to India and reconnects with his roots.",
    answer: "Swades",
    difficulty: "medium",
    hint: "NASA engineer."
  },
  {
    description: "A perfectionist alien struggles to understand human religion.",
    answer: "PK",
    difficulty: "easy",
    hint: "Wrong number."
  },
  {
    description: "A family plans the perfect murder after a crime threatens their daughter.",
    answer: "Drishyam",
    difficulty: "medium",
    hint: "October 2nd."
  },
  {
    description: "A visually impaired girl transforms the life of her teacher.",
    answer: "Black",
    difficulty: "hard",
    hint: "Amitabh and Rani."
  },
  {
    description: "A small-town girl becomes a superstar after joining the film industry.",
    answer: "Fashion",
    difficulty: "medium",
    hint: "Priyanka Chopra."
  },
  {
    description: "A man accidentally becomes a gangster while trying to help his father.",
    answer: "Munna Bhai M.B.B.S.",
    difficulty: "easy",
    hint: "Jaadu ki jhappi."
  },
  {
    description: "A lovable gangster uses Gandhian principles unexpectedly.",
    answer: "Lage Raho Munna Bhai",
    difficulty: "easy",
    hint: "Gandhigiri."
  },
  {
    description: "A teacher fakes being a student to expose corruption in education.",
    answer: "Main Hoon Na",
    difficulty: "medium",
    hint: "SRK on campus."
  },
  {
    description: "A bride-to-be falls for another man before her arranged marriage.",
    answer: "Hum Dil De Chuke Sanam",
    difficulty: "hard",
    hint: "Aishwarya, Salman, Ajay."
  },
  {
    description: "A man relives the same day repeatedly trying to save his girlfriend.",
    answer: "Loop Lapeta",
    difficulty: "hard",
    hint: "Time loop Bollywood."
  },
  {
    description: "A strict father struggles with his son choosing music over engineering.",
    answer: "Rockstar",
    difficulty: "medium",
    hint: "Ranbir Kapoor heartbreak."
  },
  {
    description: "A rich businessman with quadriplegia fights for his right to die.",
    answer: "Guzaarish",
    difficulty: "hard",
    hint: "Hrithik Roshan."
  },
  {
    description: "A math genius from Patna trains underprivileged students.",
    answer: "Super 30",
    difficulty: "medium",
    hint: "Anand Kumar."
  },
  {
    description: "A village creates fake electricity problems to save their homes.",
    answer: "Peepli Live",
    difficulty: "hard",
    hint: "Satirical rural story."
  }
];
        ]);

        console.log('Puzzles seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding puzzles:', error.message);
        process.exit(1);
    }
};

seedPuzzles();