const ADD_NOTE = "ADD_NOTE";
const REMOVE_NOTE = "REMOVE_NOTE";

const noteReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        noteList: [...state.noteList, action.payload],
      };
    case REMOVE_NOTE:
      console.log(state, action);
      return {
        ...state,
        noteList: state.noteList.filter((note) => note.id !== action.payload),
      };
    default:
      console.log("default");
  }
};

export { noteReducer, ADD_NOTE, REMOVE_NOTE };
