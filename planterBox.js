const prompt = require('prompt-sync')();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Game variables
var box = [];
var time = 0;
var wood = 0;

// Initialise the game
console.log('===== PLANTER BOX (Node.js port) =====');
var size = prompt("How big should the box be? ");
// var sqOrRec = prompt("Should it be square? (t/f) "); on hold
console.log('Type \'help\' for all commands');

// Initialises the box to the starting state
for (i = 0; i < size * size; i++) {
    box.push('.');
}

box[0] = 'T';
box[15] = 'T';

while(true) {
    time++
    renderBox()

    // Handle User Input (Gameplay)
    var input = prompt('> ');
    if (input == 'help') {
        console.log('help       - prints this menu');
        console.log('chop X Y   - remove a tree at point on the grid');
        console.log('time       - displays in-game time/turns');
        console.log('inv        - displays all of your resources');
        console.log('quit       - ends the game');

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

        if (box[i] == 'T') {
            wood++
            box[i] = '.';
        }

    } else if (input == 'time') {
        console.log(`The time is ${time}`);
    } else if (input == 'inv') {
        console.log('==== Viewing inventory ====');
        console.log(`You have: \n - ${wood} Wood`)
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