import React, { useContext, useState } from "react";
import categoryList from "../utils";
import AppContext from "../store/context";
import "./editmodal.scss";

function EditModal({ id, setEditModal }) {
  const { state } = useContext(AppContext);
  const [title, setTitle] = useState();
  const data = state.noteList.filter((note) => note.id == id);
  return (
    <div className="Modal">
      <div className="overlay">
        <div className="wrapper">
          <div className="top">
            <h3>Edit Modal </h3>
            <button onClick={() => setEditModal(false)}>close</button>
          </div>

          <form>
            <input type="text" placeholder="title" />
            <input type="text" placeholder="body" />
            <select name="" id="">
              <option value="category">category</option>
              {categoryList.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
            <button type="input">EDIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
