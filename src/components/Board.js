import React, { useState, useContext, useEffect, useRef } from "react";
import Sequare from "./Sequare";
import { BingoContext } from "../App";
import Bingo from "./Bingo";

export default function Board() {
  const { state, dispatch } = useContext(BingoContext);
  const [sequares, setSequares] = useState([]);
  const [bingoArr, setBingoArr] = useState([]);
  const [numberOfSuccess, setNumberOfSuccess] = useState(0);
  const bingoSuccess = useRef(null);
  // console.log("board board :::", state.board);
  useEffect(() => {
    dispatch({ type: "GAMESTART" });
    setSequares(state.board);
  }, []);

  const handleChange = (e) => {
    e.target.classList.toggle("active");
    dispatch({ type: "CLICKBINGO", payload: +e.target.textContent });
    let slen = state.successList.length > 0 ? 1 : 0;

    if (slen > 0) {
      let temp = [];
      state.successList.map((item) => item.items.map((i) => temp.push(i)));
      setBingoArr(temp);
      console.log("ref", bingoSuccess);
      console.log("flag", state.flag);
      if (state.flag) {
        bingoSuccess.current.fadeOut();
      }
    }
  };

  return (
    <>
      <div className="grid-container">
        {sequares.map((sequare, i) => {
          return sequare.map((seq, j) => {
            return (
              <Sequare
                active={seq.checked}
                handleChange={handleChange}
                bingo={bingoArr.includes(seq.number)}
                key={j + i}
              >
                {seq.number}
              </Sequare>
            );
          });
        })}
      </div>
      <Bingo ref={bingoSuccess} />
    </>
  );
}
