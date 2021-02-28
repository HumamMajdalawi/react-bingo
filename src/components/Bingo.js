import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { useSpring, animated } from "react-spring";

function Bingo(props, ref) {
  const [state, toggle] = useState(true);
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    fadeOut: () => {
      inputRef.current.style.display = "block";
      setTimeout(() => {
        inputRef.current.style.display = "none";
      }, 2000);
    },
  }));
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 3000 },
  });
  return (
    <div
      style={{ position: "absolute", top: "30%", left: "40%", zIndex: "9999" }}
      onClick={() => toggle(!state)}
    >
      <animated.div
        ref={inputRef}
        style={{
          display: "none",
          position: "absolute",
          fontSize: "10rem",
          color: "yellow",
          opacity: x.interpolate({ range: [0, 1], output: [0.3, 3] }),
          transform: x
            .interpolate({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 2],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 3],
            })
            .interpolate((x) => `scale(${x})`),
        }}
      >
        Bingo
      </animated.div>
    </div>
  );
}

export default Bingo = forwardRef(Bingo);
