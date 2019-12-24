import { reducer as syncReducer } from "./reducer-worker";
import reducer, { State, Action } from "./reducer";
import { useState, useCallback, useEffect, useRef } from "react";

export function useAsyncReducer(initialState: State) {
  const [state, setState] = useState(initialState);
  const [isRunningInWorker, setIsRunningInWorker] = useState(false);

  const dispatch = (action: Action, opts?: { runInWorker: boolean }) => {
    if (opts?.runInWorker) {
      setIsRunningInWorker(true);
      reducer(state, action)
        .then(newState => {
          setState(prev => {
            console.log("Returning and uppdating state", prev, newState);

            // TODO: Because the full state is returned, we also need a way to know how to merge
            // in case a sync action was dispatched while in flight
            return { ...prev, ...newState };
          });
        })
        .finally(() => {
          setIsRunningInWorker(false);
        });
    } else {
      setState(prev => syncReducer(prev, action));
    }
    return;
  };

  return [state, dispatch, isRunningInWorker] as [
    State,
    typeof dispatch,
    boolean
  ];
}
