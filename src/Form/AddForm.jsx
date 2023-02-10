import React, {
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import AppContext from "../store/context";
import { ACTIONS } from "../store/reducers";
import categoryList from "../utils";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./addnotes.scss";

function AddForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("default");
  const [important, setImportant] = useState(false);
  const { dispatch } = useContext(AppContext);
  const [accordion, setAccordion] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_NOTE,
      payload: {
        id: Date.now(),
        title,
        body,
        category: category ?? "default",
        importance: important,
      },
    });
    setTitle("");
    setBody("");
  };
  useEffect(() => {
    console.log(important);
  }, [important]);

  return (
    <div className="form-accordion">
      <div className="accordion-top">
        <h2>Add your notes</h2>
        <i
          className={!accordion && "closed"}
          onClick={() => setAccordion((prev) => !prev)}
        >
          <MdOutlineKeyboardArrowDown />
        </i>
      </div>

      <form
        className={accordion ? "add-notes-form" : " add-notes-form closed"}
        onSubmit={handleSubmit}
      >
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
              Category
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
            <input
              type="checkbox"
              name=""
              id=""
              checked={important}
              onChange={() => setImportant((prev) => !prev)}
            />
          </label>
        </div>

        <button className="submit-btn" type="submit">
          ADD NOTE
        </button>
      </form>
    </div>
  );
}

export default AddForm;
