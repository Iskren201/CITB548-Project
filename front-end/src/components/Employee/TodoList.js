import React, { useState } from "react";

function TodoList({ currentUserEmail }) {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      text: inputValue,
      createdBy: currentUserEmail,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md">
      <h1 className="text-2xl text-center text-gray-800 mb-4">Task to do </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="p-2 border border-gray-300 mr-2"
        />
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Add Todo
        </button>
      </form>
      <ul className="list-none p-0">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`border-b border-gray-300 py-2 flex justify-between items-center ${
              todo.done ? "line-through" : ""
            }`}
          >
            <span>
              {todo.text} (Created by:{" "}
              {todo.createdBy === currentUserEmail ? "You" : todo.createdBy})
            </span>
            <div>
              <button
                onClick={() => handleDone(index)}
                className={`p-2 ${
                  todo.done ? "bg-gray-400" : "bg-green-500"
                } text-white rounded mr-2 hover:bg-green-600 transition duration-300`}
              >
                {todo.done ? "Undone" : "Done"}
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
