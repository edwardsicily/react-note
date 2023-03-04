import React, { useContext, useState } from "react";
import "./TodoInput.scss";

function TodoInput({ handleSubmit, setTodoInput, todoInput }) {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="todo-input">
      <h3>Add a new Todo!</h3>
      <div className="todo-input-wrapper">
        <input
          type="text"
          maxLength="30"
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
          required
        />
        <input type="submit" value={"+"} />
      </div>
    </form>
  );
}

export default TodoInput;
