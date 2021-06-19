import React from "react";
import "./styles.css";
import Sync from "twilio-sync";

export default function App() {
  //const [todos, setTodos] = React.useState([]);
  const [todos, setTodos] = React.useState(["", ""]);

  React.useEffect(() => {
    fetch("http://localhost:5000/token", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        const syncClient = new Sync(data.token);
        syncClient.list("todoList").then((list) => {
          list.getItems().then((page) => {
            setTodos(page.items.map((item) => item.todo));
          });

          list.on("itemAdded", (e) => {
            setTodos((todos) => todos.concat(e.item.data.todo));
          });
        });
      });
  }, []);

  return (
    <div className="App">
      <h1>Push ToDo List</h1>
      {todos.length ? (
        <div>
          {todos.map((todo, index) => (
            <p key={index}>{todo}</p>
          ))}
        </div>
      ) : (
        <p>No to-do items.</p>
      )}
    </div>
  );
}
