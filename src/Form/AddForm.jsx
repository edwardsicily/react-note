import React, { useContext, useEffect, useState } from "react";
import AppContext from "../store/context";
import { ADD_NOTE } from "../store/reducers";
import categoryList from "../utils";
import "./addnotes.scss";

function AddForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("default");
  const { dispatch } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_NOTE,
      payload: {
        id: Date.now(),
        title,
        body,
        category: category ?? "default",
        importance: false,
      },
    });
    setTitle("");
    setBody("");
  };
  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <form className="add-notes-form" onSubmit={handleSubmit}>
      <h2>Add your notes</h2>
      <input
        value={title}
        type="text"
        name=""
        maxLength="20"
        placeholder="title"
        id=""
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input-body"
        value={body}
        type="text"
        name=""
        maxLength="100"
        id=""
        placeholder="content"
        required
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="add-bottom">
        <select
          defaultValue={"default"}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value={"default"}>
            default
          </option>
          {categoryList.map((el, idx) => {
            return (
              <option key={idx} value={el.name}>
                {el.name}
              </option>
            );
          })}
        </select>
        <label>
          Important
          <input type="checkbox" name="" id="" />
        </label>
      </div>

      <button type="submit">ADD NOTE</button>
    </form>
  );
}

export default AddForm;
