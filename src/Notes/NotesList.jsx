import React from "react";
import { useContext } from "react";
import AppContext from "../store/context";
import { FiTrash2 } from "react-icons/fi";
import { NOTEACTIONS } from "../store/reducers";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import "./notelist.scss";

export const NotesList = ({ onModalOpen }) => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="note-list">
      <h2 className="note-list-title">Your Notes</h2>
      {state.noteList.length < 1 && <div>You have no notes! Try add some!</div>}
      {state.noteList.map((note) => {
        return (
          <div key={note.id} className="note-item">
            <div className="note-item-top">
              <h4 className="title">{note.title}</h4>
              <i
                onClick={() =>
                  dispatch({
                    type: ACTIONS.TOGGLE_IMPORTANT,
                    payload: note,
                  })
                }
              >
                {note.importance ? <IoStarSharp /> : <IoStarOutline />}
              </i>
            </div>

            <p className="body">{note.body}</p>
            <div className="bottom">
              <p className="category">{note.category}</p>
              <button onClick={() => onModalOpen(note.id)}>edit</button>
              <i>
                <FiTrash2
                  onClick={() =>
                    dispatch({ type: ACTIONS.REMOVE_NOTE, payload: note })
                  }
                />
              </i>
            </div>
          </div>
        );
      })}
    </div>
  );
};
