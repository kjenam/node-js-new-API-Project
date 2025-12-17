import "./App.css";
import { useReducer, useState } from "react";

const ACTIONS = {
  ADDTODO: "add-new-todo",
  DELETETODO: "delete-new-todo",
  TOGGLETODO: "toggle-todo",
};

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADDTODO:
      return [...todos, newTodo(action.payload.name)];

    case ACTIONS.TOGGLETODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });

    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADDTODO,
      payload: { name: name },
    });
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
        <div
          key={todo.id}
          className="todo-item"
          onClick={() => {
            dispatch({ type: ACTIONS.TOGGLETODO, payload: { id: todo.id }});
            console.log(todo.id, todo.complete);
          }}
          style={{
            textDecoration: todo.complete ? "line-through" : "none",
            color: todo.complete ? "red" : "#fff",
            cursor: "pointer",
          }}
        >
          {todo.name}
        </div>
      ))}
    </>
  );
}

export default App;
