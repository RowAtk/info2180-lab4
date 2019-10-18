// Game utility variables
let squareStates = [];  // keeps track of the current game's state
let maxTurns = 9;   // maximum number of states allowed in the game
let choices = ['X', 'O'];   // the representation of player 1 and 2 plays (should only work with first elements)
let gameover = false;

// Game elements
let squares;
let statusDiv = null;

// starter events
window.onload = () => {

    // setup board
    let board = document.getElementById("board"); // get main board
    statusDiv = document.getElementById("status");
    squares = board.children;   // get squares in boards
    for(let square of squares){
        setSquare(square);  // add classes to board squares
        square_events(square);  // add event listeners to square item
    }

    // other setup events
    let restartButton = document.getElementsByClassName("btn")[0];
    restartButton.onclick = restart;
};

function square_events(square){
    square.onclick = click_square;  // add event listener for making plays (clicks)
    hover_square(square); // add hover events
}

// Set Board square classes
function setSquare (square){
    square.classList.add("square")
}

// Set classes when user hovers over square
function hover_square(square) {
    square.addEventListener('mouseover', () => {
        square.classList.add("hover");
    });
    square.addEventListener('mouseout', () => {
        square.classList.remove("hover");
    });
}

// click a square to play (alternates between players.. no undo!)
function click_square(){
    let choice;
    if(squareStates === []){choice = choices[0];}
    else{choice = nextChoice();}

    // ensures square with play is ignored
    if(!this.innerText && !gameover){
        squareStates.push(nextChoice());
        play(this, choice); // make a play on board
        gameover = isGoal() // checks for goal state in the game and ends it if found
    }
}

function play(el, choice) {
    el.classList.add(choice);
    el.innerText = choice;
}

// find last element in a given array
function last(array){
    return array[array.length - 1]
}

// determines the next play to be made (in the alternating sequence)
function nextChoice(){
    if(last(squareStates) === choices[0]){
        return choices[1];
    }else{
        return choices[0];
    }
}

/*
GAME GOAL STATES CHANGES

choice 0 WIN - 3 choice 0 characters in a row(vertically, horizontally or diagonally)
choice 1 WIN - 3 choice 1 characters in a row(vertically, horizontally or diagonally)
DRAW - Board Full (all 9 squares have a play) with none of the other goal states met
 */

// is this state a winning goal state?
function isWin(){

    //check columns and rows for matching plays
    const checkLine = (move, diff) => {
        for(let i=0;i<(move*3);i+=move){
            let square1 = getText(squares[i]);
            let square2 = getText(squares[i+diff]);
            let square3 = getText(squares[i+(2*diff)]);

            if(square1 && square2 && square3){  // are all squares in column/row populated?
                if(square1 === square2 && square1 === square3) { // are all squares in column/row equal?
                    return true
                }
            }
        }
        return false
    };

    // check diagonals of board for goal state
    const checkDiag = () => {
        let mid = getText(squares[4]);
        let topleft = getText(squares[0]);
        let topright = getText(squares[2]);
        let bottomleft = getText(squares[6]);
        let bottomright = getText(squares[8]);

        if((mid && topleft && bottomleft) || (mid && topright && bottomright)){ // are all squares in diagonal populated
            return (mid === topleft && mid === bottomright) || (mid === topright && mid === bottomleft) // are they equal?
        }
        return false
    };

    return checkLine(1,3) || checkLine(3,1) || checkDiag();
}

// Is the board full? Goal state - DRAW or WIN
function isFull(){
    return squareStates.length >= maxTurns;
}

// is the current state of the board a goal state?
function isGoal() {
    if(isFull()){
        if(isWin()){
            congrats();
            return true
        } else{
            draw();
            return true
        }
    }
    else if (isWin()){
        congrats();
        return true
    }
    return false
}

// Congratulate winning player at winning goal state
function congrats(){
    statusDiv.textContent = "Congratulations! " + last(squareStates) + " is the Winner!";
    statusDiv.classList.add("you-win");
}

// Announce draw and full board goal state
function draw(){
    statusDiv.textContent = "DRAW!!";
}

// get text content of a given element
function getText(el){
    return el.textContent;
}


// restart game without reloading page
function restart() {
    gameover = false;
    squareStates = [];
    for(let square of squares){
        square.textContent = null;
        square.classList.remove(choices[0], choices[1]);
    }
    statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
    // console.log("RESTART");
    // console.log(squares);
}