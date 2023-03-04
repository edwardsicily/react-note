import { useReducer, useState, useEffect } from "react";
import { isTokenExpired } from "./utils/utils";
import AppContext from "./store/context";
import { Route, Routes } from "react-router-dom";
import { noteReducer, USERACTIONS, OTHERACTIONS } from "./store/reducers";
import "./App.css";
import initialState from "./store/initialState";
import Home from "./Pages/Home/Home";
import Notes from "./Pages/Notes/Notes";
import Todo from "./Pages/Todo/Todo";
import Auth from "./Pages/Auth/Auth";

function App() {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  useEffect(() => {
    const rawuserData = localStorage.getItem("userData");
    const userData = JSON.parse(rawuserData);
    if (!userData) return;
    if (!isTokenExpired(userData.token)) {
      dispatch({ type: USERACTIONS.SET_USER, payload: userData });
      if (state.isSessionExpired)
        dispatch({ type: OTHERACTIONS.SET_SESSION_EXPIRED, payload: false });
    } else {
      dispatch({ type: OTHERACTIONS.SET_SESSION_EXPIRED, payload: true }); //session expired
      dispatch({ type: USERACTIONS.LOGOUT_USER });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<h2>Not found</h2>} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
