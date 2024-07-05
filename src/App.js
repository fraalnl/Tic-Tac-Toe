import { useState } from 'react';

// Square component can be passed a prop called { value }
//add the onSquareClick() callback (when square is clicked) to the Square component’s props
function Square({ value, onSquareClick }) {  // child component
  //value stores the value and setValue is a function to change the value. 
  //null: initial value for this state variable
  //When you call `useState(null)`, it returns an array with two elements: 
//The first element (`value` in your case) is the current state value.
//The second element (`setValue` in your case) is a function that you can use to update that state value.
//removing the Square component’s own stateful tracking of value 
// and the button’s onClick prop  
// const[value, setValue] = useState(null);

  // function handleClick() {
  //   setValue('X');
  // }
//calling this set function from an onClick handler, 
//React to re-render that Square whenever its <button> is clicked
  // return (
  //   <button 
  //   className="square"
  //   onClick = {handleClick}
  //   >
  //   {value}
  //   </button>  
  // );
  //`Square` call that function when a square is clicked
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({xIsNext, squares, onPlay}) {  // parent component
  // const [xIsNext, setXIsNext] = useState(true);
  // // declares a state variable `squares` that defaults to an array of 9 nulls
  // // Each entry in the array corresponds to the value of a square
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // if the square already has a X or an O 
    // calculateWinner(squares) returns a string X or O if found, or null
    if (calculateWinner(squares) || squares[i] ) { 
      return;
    }
    // without arguments, copy the whole array
    const nextSquares = squares.slice();//array.slice(start, end) in JS, shallow copy
    if (xIsNext) {
      // updates the nextSquares array to add X to the first square
      nextSquares[i] = "X"; 
    } else {
      nextSquares[i] = "O";
    }
    
    // Calling the `setSquares` trigger a re-render of the components 
    // that use the squares state (Board) as well as its child components
    // setSquares(nextSquares); // update `squares` state with the modified array
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
    {/* embed the value of the status variable directly within the HTML */}
      <div className="status">{status}</div>
    {/* Board passes `value` prop down to each Square */}
      <div className="board-row">
{/* When square clicked, the code after the => will run, calling handleClick(0). */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>      
    </>
  );
}
// global scope, because declared outside of any function or block
// Variables and functions declared inside a function have local scope
function calculateWinner(squares) {
  const lines = [ // 2d array, possible winning combinations
    // win: 3 in any one line has the same value
    [0, 1, 2], // top row
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) { // loop each winning combination
    // destructuring assignment to extract the 3 indices from the current winning 
    // combination(lines[i]), store in a, b, c
    const[a, b, c] = lines[i];
    //squares[a]: is not empty/null
    //squares[a] === squares[b]: at indices a and b have the same play's mark
    // if 3 conditions are true, a winning combination
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // X or O, indicating the winning player
    }
  }
  return null;
}
// top-level component
export default function Game() {
  const[xIsNext, setXIsNext] = useState(true);
  // an array with a single item, which is an array of 9 nulls
  const[history, setHistory] = useState([Array(9).fill(null)]);
  // read the last (current) squares array from history
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    // ...syntax creates a shallow copy
    // new array contain all items in history, + nextSquares (current board state)
    // without modifying original history, ensuring every move is recorded in history
    //eg. if history is [[null,null,null], ["X",null,null]], nextSquares is ["X",null,"O"]
    // new [...history, nextSquares] array will be [[null,null,null], ["X",null,null], ["X",null,"O"]].
    setHistory([...history, nextSquares]); // without modifying original history
    setXIsNext(!xIsNext); // switch player turn to the next player
  }

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}