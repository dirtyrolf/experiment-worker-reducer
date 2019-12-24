/* eslint-disable import/no-webpack-loader-syntax */
import { Action as AT, State as ST, Reducer } from "./reducer-worker";
const worker = require("workerize-loader!./reducer-worker");
const instance = worker();

export default instance.reducer as (state: ST, action: AT) => Promise<State>;

export type Action = AT;
export type State = ST;
