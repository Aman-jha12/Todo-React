import { useState } from "react";

export function CreateTodo({ onTodoCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        id="title"
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        id="description"
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button
        style={{ padding: 10, margin: 10 }}
        onClick={() => {
          fetch("http://localhost:8080/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(async function (res) {
              const json = await res.json();
              alert("Todo has been added");
              onTodoCreated(); // 🔁 Refresh the list
              setTitle(""); // Optional: clear input
              setDescription("");
            })
            .catch((err) => {
              console.error("Error creating todo:", err);
              alert("Failed to add todo");
            });
        }}
      >
        Create
      </button>
    </div>
  );
}
