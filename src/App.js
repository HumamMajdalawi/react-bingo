import React, { useReducer } from "react";
import "./App.css";
import Board from "./components/Board";

export const BingoContext = React.createContext({});

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <BingoContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Board />
      </div>
    </BingoContext.Provider>
  );
}

export default App;

function shuffleRandom() {
  let ar = [];
  let temp;
  let rnum;
  for (let i = 1; i <= 25; i++) ar.push({ number: i, checked: false });
  for (let i = 0; i < ar.length; i++) {
    rnum = Math.floor(Math.random() * 25);
    temp = ar[i];
    ar[i] = ar[rnum];
    ar[rnum] = temp;
  }
  var resultArr = [
    ar.slice(0, 5),
    ar.slice(5, 10),
    ar.slice(10, 15),
    ar.slice(15, 20),
    ar.slice(20, 25),
  ];
  return resultArr;
}

function bingoCheck(board, successList, x, y) {
  let flag = false;
  // horizntal
  let items = [];
  let bingo = board[x].every((item) => {
    items.push(item.number);
    return item.checked === true;
  });
  if (bingo && !successList.includes("horz/" + (x + 1))) {
    flag = true;
    successList.push({ name: "horz/" + (x + 1).toString(), items });
  }
  // vertical
  let count = 0;
  items = [];
  for (let i = 0; i < 5; i++) {
    if (board[i][y].checked) {
      items.push(board[i][y].number);
      count++;
    }
  }
  if (count === 5 && !successList.includes("ver/" + (y + 1))) {
    flag = true;
    successList.push({ name: "ver/" + (y + 1).toString(), items });
  }
  //  diagonal
  items = [];
  if (x === y) {
    count = 0;
    for (let i = 0; i < 5; i++) {
      if (board[i][i].checked) {
        items.push(board[i][i].number);
        count++;
      }
    }
    if (count === 5 && !successList.includes("dig/1")) {
      flag = true;
      successList.push({ name: "dig/1", items });
    }
  }
  // diagonal2
  items = [];
  if (x === 4 - y) {
    count = 0;
    for (let i = 0; i < 5; i++) {
      if (board[i][4 - i].checked) {
        items.push(board[i][4 - i].number);
        count++;
      }
    }
    if (count === 5 && !successList.includes("dig/2")) {
      flag = true;
      successList.push({ name: "dig/2", items });
    }
  }

  return flag;
}

const intialState = {
  gameState: "GAMESTART",
  playerTurn: 0,
  winner: "",
  board: Array.from(Array(5), () =>
    Array(5).fill({ number: 0, checked: false })
  ),
  successList: [],
  flag: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "GAMESTART":
      state.board = shuffleRandom();
      state.board[2][2].checked = true;
      console.log("bored mid", state.board[2][2].checked);
      return state;

    case "CLICKBINGO":
      let board = state.board;
      console.log("board", board);
      const number = action.payload;
      let x, y;
      x = board.findIndex((subArr) => {
        y = subArr.findIndex((item) => {
          return item.number === number;
        });
        return y !== -1;
      });
      console.log("x,y : ", x, y);
      const sequare = board[x][y];
      if (!sequare.checked) {
        sequare.checked = true;
      } else {
        sequare.checked = false;
        let tempArr = state.successList;
        state.successList.forEach((item, index) => {
          if (item.items.includes(sequare.number)) {
            tempArr[index] = false;
          }
        });
        state.successList = tempArr.filter((i) => i != false);
      }
      state.flag = bingoCheck(board, state.successList, x, y);
      console.log("flag:", state.flag);
      console.log("successList: ", state.successList);
      if (state.successList.length >= 5) {
        state.nextWinner = "winP1";
      }

      return state;

    default:
      return state;
  }
}
