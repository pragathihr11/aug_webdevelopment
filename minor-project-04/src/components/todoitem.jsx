function TodoItem({ task, onComplete, onDelete }) {
  return (
    <div className="todo-item">
      <div>
        <h3 className={task.completed ? "completed" : ""}>
          {task.text}
        </h3>

        <span className={task.completed ? "done" : "pending"}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="buttons">
        <button onClick={() => onComplete(task.id)}>
          {task.completed ? "Undo" : "Done"}
        </button>

        <button
          className="delete"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;