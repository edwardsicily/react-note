import { createContext } from "react";
import initialState from "./initialState";

const AppContext = createContext(initialState);

export default AppContext;
