console.log("hey! welcome to tic tac toe");
//alert("hello");

    // JavaScript in this game:

// 1. Basic Setup
// 2. Determine Winner
// 3. Basic AI and Winner Notification
// 4. Minimax Algorithm(**)

var origboard;

const human = 'O';
const comp  = 'X';

const wincombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,5,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
]

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  origboard = Array.from(Array(9).keys());
  // console.log(origboard);
  for(var i = 0;i<cells.length;i++){
    cells[i].innerText = "";
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click' , turnClick , false);
  }
}

function turnClick(square) {
//  console.log(square.target.id);
  if(typeof origboard[square.target.id] === 'number'){

    turn(square.target.id , human);
    if(!checkTie())
      turn(bestSpot(), comp);

  }


}

function turn(squareId , player) {
  origboard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origboard , player);
  if(gameWon)
    gameOver(gameWon);
}

function checkWin(board , player) {
  let plays = board.reduce((a , e ,i) =>
      (e === player) ? a.concat(i) : a , []);
  let gameWon = null;

  for(let [index,win] of wincombos.entries()){

      if(win.every(elem => plays.indexOf(elem) > -1)  ){
        gameWon = {index : index , player : player};
        break;
      }

  }
  return gameWon;
}

function gameOver(gameWon) {

    for(let index of wincombos[gameWon.index]){
      document.getElementById(index).style.backgroundColor =
        gameWon.player == human ? "blue" : "red" ;
    }

    for(var i = 0;i < cells.length ;i++){
      cells[i].removeEventListener('click', turnClick , false);
    }
    declareWinner(gameWon.player == human? "You Win!!" : "You Lose!!");
}

function emptySquares() {
  return origboard.filter(s => typeof s == 'number');
}

function bestSpot() {
  return emptySquares()[0];
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;

}

function checkTie() {
    if(emptySquares().length == 0){
      for(var i = 0 ; i<cells.length  ;i++){
        cells[i].style.backgroundColor = "green";
        cells[i].removeEventListener('click',turnClick , false);
      }
      declareWinner("Tie Game!!")
      return true;
    }
    return false;
}









//
