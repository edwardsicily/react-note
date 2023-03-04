import React, { useContext, useState } from "react";
import {
  BsSquare,
  BsCheckSquareFill,
  BsXCircle,
  BsPencilSquare,
} from "react-icons/bs";
import AppContext from "../../store/context";
import { POST, DELETE } from "../../utils/http";
import { TODOACTIONS } from "../../store/reducers";
import "./todoItem.scss";

function TodoItem({ data }) {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({
    status: data?.status,
    text: data?.text,
  });

  const handleCancelEdit = () => {
    setEditValues({ status: data.status, text: data.text });
    setEdit(false);
  };
  const handleEditStatus = () => {
    setEditValues((prev) => {
      return {
        ...prev,
        status: !prev.status,
      };
    });
  };

  const handleEditText = (value) => {
    setEditValues((prev) => {
      return {
        ...prev,
        text: value,
      };
    });
  };

  const handleSubmitEdit = () => {
    //controlli e poi nuova fetch
    if (
      editValues.text === "" ||
      (editValues.text === data.text && editValues.status === data.status)
    )
      return;
    console.log("posso fare nuova chiamata");
    setLoading(true);
    POST(`/todo/${data._id}`, editValues, state.userData.token, "PATCH")
      .then((res) => {
        if (res.statusError) {
          console.log(res);
        } else {
          console.log(res);
          dispatch({
            type: TODOACTIONS.UPDATE_TODO,
            payload: { ...res, ...editValues },
          });
        }
      })
      .finally(() => {
        setEdit(false);
        setLoading(false);
      });
  };

  const handleChangeStatus = () => {
    const body = {
      status: !data.status,
    };

    POST(`/todo/${data._id}`, body, state.userData.token, "PATCH").then(
      (res) => {
        if (res.statusError) {
          console.log(res);
        } else {
          dispatch({
            type: TODOACTIONS.UPDATE_TODO,
            payload: { ...data, status: !data.status },
          });
        }
      }
    );
    console.log(state.todoList);
  };

  const handleRemove = () => {
    DELETE(`/todo/${data._id}`, state.userData.token).then((res) => {
      if (res.statusError) {
        console.log(res);
      } else {
        dispatch({ type: TODOACTIONS.DELETE_TODO, payload: data._id });
      }
    });
  };
  return (
    <div className="todo-item">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {edit ? (
            <>
              <div className="todo-item-left">
                <i onClick={handleEditStatus}>
                  {!editValues.status ? <BsSquare /> : <BsCheckSquareFill />}
                </i>
                <input
                  type="text"
                  onChange={(e) => handleEditText(e.target.value)}
                  value={editValues.text}
                />
              </div>
              <div className="todo-item-btns">
                <button onClick={handleSubmitEdit}>Done</button>
                <button onClick={handleCancelEdit}>Back</button>
              </div>
            </>
          ) : (
            <>
              <div className="todo-item-left">
                <i onClick={handleChangeStatus}>
                  {!data.status ? <BsSquare /> : <BsCheckSquareFill />}
                </i>
                <h4>{data?.text}</h4>
              </div>

              <div className="todo-item-btns">
                <i onClick={() => setEdit(true)}>
                  <BsPencilSquare />
                </i>
                <i onClick={handleRemove}>
                  <BsXCircle />
                </i>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TodoItem;
