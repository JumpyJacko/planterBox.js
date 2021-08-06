const prompt = require('prompt-sync')();

// Game variables
var box = [];
var time = 0;
var growTimer = 0;
var wood = 0;
var seed = 0;

var treeChance = 20;
var seedChance = 50;
var growChance = 30;

// Initialise the game
console.log('===== PLANTER BOX (Node.js port) =====');
var size = prompt("How big should the box be? ");
// var sqOrRec = prompt("Should it be square? (t/f) "); on hold
console.log('Type \'help\' for all commands');

// Initialises the box to the starting state
for (i = 0; i < size * size; i++) {
    if (getRandomInt(100) < treeChance) {
        box.push('T ');
    } else {
        box.push('. ');
    }
}

while(true) {
    grow()
    renderBox()

    // Handle User Input (Gameplay)
    var input = prompt('> ');
    if (input == 'help') {
        console.log('help       - prints this menu');
        console.log('quit       - ends the game');
        console.log('----------------')
        console.log('chop X Y   - remove a tree at point on the grid');
        console.log('plant X Y  - plant tree at point on grid, requires seeds');
        console.log('             and time to grow');
        console.log('build X Y  - build a fence/house at point on grid');
        console.log('time       - displays in-game time/turns');
        console.log('inv        - displays all of your resources');

        console.log(`\n
Additional note: 
The grid starts from 0 0, like this:
0,0 1,0 2,0
0,1 1,1 2,1
0,2 1,2 2,2
\n`
)
    } else if (input.includes('chop')) {
        // Splits input into usable variables
        splitInput = input.split(' ', 3);   
        let x = parseInt(splitInput[1]);
        let y = parseInt(splitInput[2]);

        // Solves for the index
        // Takes x and y 2D coordinates and width of the '2D' array
        // And then solves into a 1D array index (not my maths, thanks stackexchange)
        let i = x + size * y;

        if (box[i] == 'T ') {
            wood++
            if (getRandomInt(100) < seedChance) {
                seed++
                console.log('You gained 1 seed');
            }
            box[i] = '. ';
        } else {
            console.log('No tree to chop');
        }
        time++
    } else if (input.includes('plant')) {
        splitInput = input.split(' ', 3);   
        let x = parseInt(splitInput[1]);
        let y = parseInt(splitInput[2]);
        let i = x + size * y;
        
        if (box[i] == '. ' && seed != 0) {
            seed--
            box[i] = 's ';
        } else {
            console.log('No place to plant or no seeds');
        }
        time++
    } else if (input == 'time') {
        console.log(`The time is ${time}`);
    } else if (input == 'inv') {
        console.log('==== Viewing inventory ====');
        console.log(`You have: \n - ${wood} Wood(s)\n - ${seed} Seed(s)`);
    } else if (input == 'quit') {
        console.log('Ending game...');
        process.exit();
    } else {
        console.log('Please input a valid command');
    }
}


// Renders(?) the box
function renderBox() {
    for (i = 0; i < box.length; i++) {
        if ((i+1) % size != 0) {
            process.stdout.write(box[i]);
        } else {
            process.stdout.write(box[i] + '\n');
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function grow() {
    if (growTimer > 5) {
        if (getRandomInt(100) < growChance) {
            for (i = 0; i < box.length; i++) {
                if (box[i] == 's ') {
                    box[i] = 'T ';
                    growTimer = 0;
                }
            }
            growChance = 30;
        } else {
            growChance += 10
        }
    } else {
        growTimer++
    }
    console.log(growTimer, growChance);
}