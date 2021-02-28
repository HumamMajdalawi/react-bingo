import React from "react";

export default function Button(props) {
  const active = props.active ? "active gird-item" : "gird-item";
  const bingo = props.bingo ? "bingo " + active : active;
  return (
    <button onClick={(e) => props.handleChange(e)} className={bingo}>
      {props.children}
    </button>
  );
}
