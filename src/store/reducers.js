const NOTEACTIONS = {
  ADD_NOTE: "ADD_NOTE",
  REMOVE_NOTE: "REMOVE_NOTE",
  TOGGLE_IMPORTANT: "TOGGLE_IMPORTANT",
  EDIT_NOTE: "EDIT_MODAL",
};

const OTHERACTIONS = {
  SET_SESSION_EXPIRED: "SET_SESSION_EXPIRED",
};

const USERACTIONS = {
  SET_USER: "SET_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

const TODOACTIONS = {
  ADD_TODO: "ADD_TODO",
  SET_TODO: "SET_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
};

const noteReducer = (state, action) => {
  switch (action.type) {
    case TODOACTIONS.DELETE_TODO:
      const newArr = state.todoList.filter(
        (elem) => elem._id !== action.payload
      );
      return {
        ...state,
        todoList: [...newArr],
      };

    case TODOACTIONS.UPDATE_TODO:
      const updatedArr = state.todoList.map((elem) => {
        if (elem._id !== action.payload._id) return elem;
        return { ...action.payload };
      });
      console.log(updatedArr);
      return {
        ...state,
        todoList: [...updatedArr],
      };

    case TODOACTIONS.SET_TODO:
      return {
        ...state,
        todoList: action.payload,
      };

    case USERACTIONS.LOGOUT_USER:
      localStorage.removeItem("userData");
      return {
        ...state,
        userData: null,
      };
    case USERACTIONS.SET_USER:
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };

    case NOTEACTIONS.ADD_NOTE:
      return {
        ...state,
        noteList: [...state.noteList, action.payload],
      };
    case NOTEACTIONS.REMOVE_NOTE:
      return {
        ...state,
        noteList: state.noteList.filter(
          (note) => note.id !== action.payload.id
        ),
      };
    case NOTEACTIONS.TOGGLE_IMPORTANT:
      const updatedNoteArr = state.noteList.map((note) => {
        if (note.id != action.payload.id) return note;
        return {
          ...note,
          importance: !note.importance,
        };
      });

      return {
        ...state,
        noteList: updatedNoteArr,
      };

    default:
      console.log("default", state, action);
  }
};

export { noteReducer, NOTEACTIONS, TODOACTIONS, USERACTIONS, OTHERACTIONS };
