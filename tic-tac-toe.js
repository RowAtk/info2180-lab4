let squareStates = [];  // keeps track of the current game's state
let maxTurns = 9;   // maximum number of states allowed in the game
let choices = ["X", "O"];   // the representation of player 1 and 2 plays (should only work with first elements)

// starter events
window.onload = () => {
    let board = document.getElementById("board"); // get main board
    let squares = board.children;   // get squares in boards
    console.log(board);
    console.log(squares);
    for(let square of squares){
        setSquare(square);
        square_events(square);  // add event listeners to square item
    }
};

function square_events(square){
    square.onclick = click_square;  // add event listener for making plays (clicks)
    hover_square(square); // add hover events
    // square.textContent = "X";
}

// Set Board square classes
function setSquare (square){
    console.log(square);
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

// Remove classes when user no longe rhovers

// click a square to play (alternates between players.. no undo!)
function click_square(){
    let choice;
    console.log("Square clicked");
    console.log(this);
    if(squareStates === []){choice = choices[0];}
    else{choice = nextChoice();}

    // ensures square with play is ignored
    if(!this.innerText){
        squareStates.push(nextChoice());
        this.innerText = last(squareStates);
    }
}

function play(el, choice) {
    el.innerText = choice;
    el.classList.add(choice);
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