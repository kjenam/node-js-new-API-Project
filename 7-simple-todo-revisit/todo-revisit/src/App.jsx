import { useEffect, useState } from "react";
import "./App.css";
import Todo from "../components/Todo";

function App() {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      const data = await fetch("https://dummyjson.com/todos");
      const res = await data.json();
      setTodos(res.todos);
      console.log(res);
    } catch (e) {
      console.log("Error occurred while fetching data", e);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTodos();
    console.log("todos recieved on page load");
  }, []);

  return (
    <>
      {todos.map((item) => {
        return (
          <div key={item.id} className="todo">
            <Todo todo = {item} />
          </div>
        );
      })}
    </>
  );
}

export default App;
