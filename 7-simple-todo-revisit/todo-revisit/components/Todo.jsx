import { useState } from "react";

function Todo({ todo }) {
  const [showDetails, setShowDetails] = useState(false);
  const [completed, setCompleted] = useState(todo.completed)

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  function flipCompletion(){
    setCompleted(!completed)
    console.log(todo.completed)
  }
  return (
    <>
      <div className="todo">
        <p>{todo.todo}</p>
        <p>{todo.userId}</p>

        <button onClick={toggleDetails}>See Details</button>

        {showDetails ? (
          <>
            <div>{`todo.completed = ${completed}`}</div>
            <button onClick = {flipCompletion}>Toggle</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Todo;
