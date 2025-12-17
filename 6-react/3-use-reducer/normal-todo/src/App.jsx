import "./App.css";
import { useState } from "react";

function App() {
  const [todos,setTodos] = useState([]); 
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault()
    setTodos([...todos, { id: Date.now(), text: name }]);
    setName("");
    console.log(todos);
  }

  return (
    <>
      haiiiii :3
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          {todo.text}
        </div>
      ))}
    </>
  );
}

export default App;
