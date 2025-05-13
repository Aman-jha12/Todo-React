import { useEffect, useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("http://localhost:8080/todo")
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  useEffect(() => {
    fetchTodos(); // Fetch once on mount
  }, []);

  return (
    <div>
      <CreateTodo onTodoCreated={fetchTodos} />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
