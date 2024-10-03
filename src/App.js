import { useState } from "react";
import "./App.css";

function App() {
  // State for input text

  const [inputText, setInputText] = useState("");

  // State for the array of to-do items

  const [todoArray, setTodoArray] = useState([]);

  // State for the current filter

  const [filter, setFilter] = useState("all");

  // Handle input field changes
  // انپٹ فیلڈ کی تبدیلیوں کو ہینڈل کریں
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle adding a new to-do item

  const addTodo = () => {
    if (inputText.trim()) {
      // Check if the input text is not empty
      // Create a new to-do item with a unique ID and default completion status
      const newTodo = {
        id: Math.random().toString(36).substr(2, 9), // Unique ID
        text: inputText.trim(),
        completed: false, // New items are not completed by default
      };
      // Add the new to-do item to the existing array
      setTodoArray([...todoArray, newTodo]);
      // Clear the input field after adding
      setInputText("");
    }
  };

  // Handle deleting a to-do item

  const deleteTodo = (id) => {
    // Filter out the item with the given ID
    const newTodoArray = todoArray.filter((todo) => todo.id !== id);
    // Update the state with the filtered list
    setTodoArray(newTodoArray);
  };

  // Handle toggling completion status

  const toggleCompletion = (id) => {
    // Map over the existing todos and update the completion status of the item with the given ID
    const updatedTodos = todoArray.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    // Update the state with the modified todos
    setTodoArray(updatedTodos);
  };

  // Filter todos based on the current filter

  const filteredTodos = todoArray.filter((todo) => {
    if (filter === "all") return true; // Show all items
    if (filter === "active") return !todo.completed; // Show only active items
    if (filter === "completed") return todo.completed; // Show only completed items
    return true;
  });

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>ToDoApp</h1>
          <nav className="filter-nav">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </nav>
        </header>
        <div className="todo-input-container">
          <input
            value={inputText}
            onChange={handleInputChange}
            type="text"
            className="todo-input"
            placeholder="Add a new task..."
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)}
              />
              <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <footer className="footer">
          <span className="remaining-tasks">
            {filteredTodos.length} item{filteredTodos.length !== 1 ? "s" : ""}{" "}
            left
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
