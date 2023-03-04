import React from "react";
import AddForm from "../../Form/AddForm";
import EditModal from "../../Modal/EditModal";
import { NotesList } from "../../Notes/NotesList";

function Notes() {
  return (
    <>
      <AddForm />
      <NotesList />
    </>
  );
}

export default Notes;
