import React, { useState, useReducer, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { reducer as nonOptimizedReducer } from "./reducer-worker";
import { useAsyncReducer } from "./useAsyncReducer";

// console.log(reducer({ coolNumber: 4 }, { type: "BE_COOL", payload: 9 }));

const App: React.FC = () => {
  const [inputState, setInputState] = useState("");
  const [time, setTime] = useState(new Date());
  const [state, dispatch, isRunningInWorker] = useAsyncReducer({
    coolNumber: 4,
    annoyingString: ""
  });
  const [badState, badDispatch] = useReducer(nonOptimizedReducer, {
    coolNumber: 4,
    annoyingString: ""
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTime(new Date());
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [time]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-content">
        <div className="App-state">
          <pre>{time.toLocaleTimeString()}</pre>
          <pre>{inputState}</pre>
          <h2>Good state</h2>
          <pre>{JSON.stringify({ ...state }, null, 2)}</pre>
          <h2>Bad state state</h2>
          <pre>{JSON.stringify(badState, null, 2)}</pre>
        </div>
        <div className="App-actions">
          <button
            disabled={isRunningInWorker}
            onClick={() => {
              dispatch(
                { type: "BE_COOL", payload: 42000 },
                { runInWorker: true }
              );
            }}
          >
            Do Cool Stuff
          </button>
          <button
            onClick={() => {
              dispatch({ type: "BE_FAST", payload: Math.random() });
            }}
          >
            Do Cool Fast Stuff
          </button>
          <button
            onClick={() => {
              dispatch({
                type: "BE_ANNOYING",
                payload: "Ugh..." + Math.random()
              });
            }}
          >
            Do annoying update
          </button>
          <button
            onClick={() => {
              badDispatch({ type: "BE_COOL", payload: Math.random() });
            }}
          >
            Do Bad Stuff
          </button>
          <input
            value={inputState}
            placeholder="Type in me when doing work. I dare you."
            onChange={e => setInputState(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
