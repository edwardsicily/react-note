import { useReducer, useState } from "react";
import Layout from "./Layout/Layout";
import AppContext from "./store/context";
import AddForm from "./Form/AddForm";
import { noteReducer } from "./store/reducers";
import "./App.css";
import initialState from "./store/initialState";
import { NotesList } from "./Notes/NotesList";

function App() {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout>
        <div className="main-wrapper">
          <AddForm />
          <NotesList />
        </div>
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
