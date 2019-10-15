
window.onload = () => {
    let board = document.getElementById("board");
    let squares = board.children;
    console.log(board);
    console.log(squares);
    for(let square of squares){
        setSquare(square);
    }
};

function setSquare(square){
    console.log(square);
    square.classList.add("square")
}