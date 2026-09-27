import { useState } from "react";
import NoteCard from "./notecard";

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const addNote = () => {
    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      date: new Date().toLocaleString()
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id) => {
    const selectedNote = notes.find((note) => note.id === id);

    const newTitle = prompt("Edit title:", selectedNote.title);
    const newContent = prompt("Edit note:", selectedNote.content);

    if (
      newTitle !== null &&
      newContent !== null &&
      newTitle.trim() !== "" &&
      newContent.trim() !== ""
    ) {
      setNotes(
        notes.map((note) =>
          note.id === id
            ? {
                ...note,
                title: newTitle,
                content: newContent
              }
            : note
        )
      );
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-box">
      <h2>📒 Notes App</h2>

      <div className="note-form">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button onClick={addNote}>Add Note</button>
      </div>

      <input
        className="search"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes">
        {filteredNotes.length === 0 ? (
          <p className="empty">No notes yet.</p>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotesApp;