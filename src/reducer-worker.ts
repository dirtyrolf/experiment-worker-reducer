export type Action =
  | { type: "BE_COOL"; payload: number }
  | { type: "BE_FAST"; payload: number }
  | { type: "BE_ANNOYING"; payload: string };

export type State = {
  coolNumber: number;
  annoyingString: string;
};

export type Reducer = typeof reducer;

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "BE_COOL": {
      let start = Date.now();
      while (Date.now() - start < 4000);
      return { ...state, coolNumber: action.payload };
    }
    case "BE_FAST": {
      return { ...state, coolNumber: action.payload };
    }
    case "BE_ANNOYING": {
      return { ...state, annoyingString: action.payload };
    }
  }
}
