let squareStates = [];
let maxTurns = 9;
let choices = ["X", "O"];

window.onload = () => {
    let board = document.getElementById("board");
    let squares = board.children;
    console.log(board);
    console.log(squares);
    for(let square of squares){
        setSquare(square);
        square.onclick = click_square;
        // square.textContent = "X";
    }
};

function setSquare(square){
    console.log(square);
    square.classList.add("square")
}

function click_square(){
    console.log("Square clicked");
    console.log(this);
    if(squareStates === []){
        this.innerText = choices[0];
    }else if(!this.innerText){
        squareStates.push(nextChoice());
        this.innerText = last(squareStates);
    }
}

function last(array){
    return array[array.length - 1]
}

function nextChoice(){
    if(last(squareStates) === choices[0]){
        return choices[1];
    }else{
        return choices[0];
    }
}