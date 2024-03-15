import { useState } from "react";

export function useStateToggler() {
  const [state, setState] = useState(false);

  const toggleState = () => {
    setState((oldState) => !oldState);
  };

  return [state, toggleState];
}