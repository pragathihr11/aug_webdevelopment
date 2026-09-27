function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <small>{note.date}</small>

      <div className="buttons">
        <button onClick={() => onEdit(note.id)}>
          Edit
        </button>

        <button
          className="delete"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;