import TodoApp from "./components/TodoApp";
import NotesApp from "./components/notesapp";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>My Little Workspace</h1>

      <p className="subtitle">
        Tasks • Thoughts • Plans
      </p>

      <TodoApp />

      <NotesApp />
    </div>
  );
}

export default App;