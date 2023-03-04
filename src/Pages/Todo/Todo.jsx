import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AppContext from "../../store/context";
import TodoItem from "../../components/TodoItem/TodoItem";
import { TODOACTIONS } from "../../store/reducers";
import { GET, POST } from "../../utils/http";
import TodoInput from "../../components/TodoInput/TodoInput";
import { Link } from "react-router-dom";
import FilterBy from "../../atoms/FilterBy/FilterBy";
import "../../style/Todo.scss";

function Todo() {
  const { state, dispatch } = useContext(AppContext);
  const [todoInput, setTodoInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTodos = () => {
    GET("/todo", state.userData.token).then((res) => {
      dispatch({ type: TODOACTIONS.SET_TODO, payload: res });
    });
  };

  useEffect(() => {
    console.log("render pagina todo");
  });

  useEffect(() => {
    //setLoading(true);
    if (!state.userData) return;
    getTodos();
  }, [state.userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    POST("/todo/create", { text: todoInput }, state.userData.token)
      .then((res) => {
        if (res.statusError) {
          setError(res);
        } else {
          setTodoInput("");
          getTodos();
        }
      })
      .finally(() => setLoading(false));
  };
  if (!!state.isSessionExpired)
    return (
      <>
        <h2>Session Expired</h2>
        <p>
          Go back to <Link to={"/auth"}>login</Link>
        </p>
      </>
    );
  return (
    <Layout>
      <div className="todo-main">
        {!state.userData ? (
          <div>
            <h3>
              <Link to={"/auth"}>Accedi</Link> per vedere le tue liste
            </h3>
          </div>
        ) : (
          <>
            <TodoInput
              handleSubmit={handleSubmit}
              todoInput={todoInput}
              setTodoInput={setTodoInput}
            />
            {error && (
              <p className="error">{`${error.statusError}: ${error.text}`}</p>
            )}
            <div className="filter">
              <h4>Set filter by:</h4>
              <FilterBy content={"Done"} />
              <FilterBy content={"Undone"} />
            </div>
            <div className="todo-item-wrapper">
              {state?.todoList?.length > 0 &&
                state?.todoList.map((el, idx) => (
                  <TodoItem key={idx} data={el} />
                ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Todo;
