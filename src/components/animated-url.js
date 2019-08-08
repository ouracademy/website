import React, { useEffect, useRef } from "react";
import { Location } from "@reach/router";

// From Dan Abramov's overreacted blog:
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback]
  );

  // Set up the interval.
  useEffect(
    () => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [delay]
  );
}

export const AnimatedURL = () => {
  return <Location>{props => <Animated {...props} />}</Location>;
};

const Animated = ({ location }) => {
  // prettier-ignore
  var f = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];

  useInterval(() => {
    window.history.replaceState(
      null,
      null,
      location.pathname + "#" + f[Math.floor((Date.now() / 100) % f.length)]
    );
  }, 50);

  return <div />;
};
