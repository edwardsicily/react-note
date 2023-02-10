const ACTIONS = {
  ADD_NOTE: "ADD_NOTE",
  REMOVE_NOTE: "REMOVE_NOTE",
  TOGGLE_IMPORTANT: "TOGGLE_IMPORTANT",
  EDIT_NOTE: "EDIT_MODAL",
};

const noteReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case ACTIONS.ADD_NOTE:
      return {
        ...state,
        noteList: [...state.noteList, action.payload],
      };
    case ACTIONS.REMOVE_NOTE:
      return {
        ...state,
        noteList: state.noteList.filter(
          (note) => note.id !== action.payload.id
        ),
      };
    case ACTIONS.TOGGLE_IMPORTANT:
      const updatedArr = state.noteList.map((note) => {
        if (note.id != action.payload.id) return note;
        return {
          ...note,
          importance: !note.importance,
        };
      });

      return {
        ...state,
        noteList: updatedArr,
      };

    default:
      console.log("default");
  }
};

export { noteReducer, ACTIONS };
