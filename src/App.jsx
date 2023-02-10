import { useReducer, useState } from "react";
import Layout from "./Layout/Layout";
import AppContext from "./store/context";
import AddForm from "./Form/AddForm";
import { noteReducer } from "./store/reducers";
import "./App.css";
import initialState from "./store/initialState";
import { NotesList } from "./Notes/NotesList";
import EditModal from "./Modal/EditModal";

function App() {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const [editModal, setEditModal] = useState(true);
  const [selectedObjId, setSelectedObjId] = useState(null);

  const onModalOpen = (id) => {
    setSelectedObjId(id);
    setEditModal(true);
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {editModal && (
        <EditModal setEditModal={setEditModal} id={selectedObjId} />
      )}
      <Layout>
        <div className="main-wrapper">
          <AddForm />
          <NotesList onModalOpen={onModalOpen} />
        </div>
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
