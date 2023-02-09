import React from "react";
import { useContext } from "react";
import AppContext from "../store/context";
import { FiTrash2 } from "react-icons/fi";
import { REMOVE_NOTE } from "../store/reducers";
import "./notelist.scss";
export const NotesList = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="note-list">
      <h2 className="note-list-title">Your Notes</h2>
      {state.noteList.length < 1 && <div>You have no notes! Try add some!</div>}
      {state.noteList.map((note) => {
        return (
          <div key={note.id} className="note-item">
            <h4 className="title">{note.title}</h4>
            <p className="body">{note.body}</p>
            <div className="bottom">
              <p className="category">{note.category}</p>
              <FiTrash2
                onClick={() =>
                  dispatch({ type: REMOVE_NOTE, payload: note.id })
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
