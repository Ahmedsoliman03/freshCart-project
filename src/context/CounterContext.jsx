import { createContext, useState } from "react";
export let CounterContext = createContext(0);
export function CounterContextProvider(props) {
  const [counter, setCounter] = useState(10);
  const [counter2, setCounter2] = useState(10);
  function handleCounter() {
    setCounter(Math.random);
  }
  return (
    <CounterContext.Provider value={{ handleCounter, counter, counter2 }}>
      {props.children}
    </CounterContext.Provider>
  );
}
