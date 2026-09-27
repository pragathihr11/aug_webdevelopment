import { useState } from "react";
import TodoItem from "./todoitem";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div className="app-box">
      <h2>📝 To-Do App</h2>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet.</p>
      ) : (
        tasks.map((item) => (
          <TodoItem
            key={item.id}
            task={item}
            onComplete={completeTask}
            onDelete={deleteTask}
          />
        ))
      )}
    </div>
  );
}

export default TodoApp;