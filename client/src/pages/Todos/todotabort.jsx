import React, { useState, useEffect } from "react";

// Exempel på en kategori lista som användaren kan välja mellan.
const categories = ["Hälsa", "Hushåll", "Jobbrelaterat", "Nöje"];

function Todos() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Alla");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Hämta eller initialisera todo-uppgifterna här (t.ex. från en API eller en statisk lista).
    const initialTodos = [
      {
        id: 1,
        title: "Gå till gymmet",
        description: "Träna en timme",
        status: "Ej utförd",
        timeEstimate: 60,
        category: "Hälsa",
        deadline: "2024-12-20",
      },
      {
        id: 2,
        title: "Städa huset",
        description: "Dammsug och torka golven",
        status: "Ej utförd",
        timeEstimate: 120,
        category: "Hushåll",
        deadline: "2024-12-19",
      },
    ];
    setTodos(initialTodos);
    setFilteredTodos(initialTodos);
  }, []);

  // Funktion för att filtrera och sortera todo-uppgifterna
  useEffect(() => {
    let filtered = todos;

    if (statusFilter !== "Alla") {
      filtered = filtered.filter((todo) => todo.status === statusFilter);
    }

    if (categoryFilter.length > 0) {
      filtered = filtered.filter((todo) =>
        categoryFilter.includes(todo.category)
      );
    }

    if (sortOrder === "asc") {
      filtered = filtered.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
    } else {
      filtered = filtered.sort(
        (a, b) => new Date(b.deadline) - new Date(a.deadline)
      );
    }

    setFilteredTodos(filtered);
  }, [todos, statusFilter, categoryFilter, sortOrder]);

  // Funktion för att hantera ändringar i status (slutfört eller ej)
  const toggleStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === "Slutförd" ? "Ej utförd" : "Slutförd",
          }
        : todo
    );
    setTodos(updatedTodos);
  };

  // Funktion för att ta bort ett ärende
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Funktion för att redigera ett ärende
  const editTodo = (id, updatedData) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedData } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo Lista</h1>

      {/* Filter för status */}
      <select
        onChange={(e) => setStatusFilter(e.target.value)}
        value={statusFilter}
      >
        <option value="Alla">Alla</option>
        <option value="Slutförd">Slutförd</option>
        <option value="Ej utförd">Ej utförd</option>
      </select>

      {/* Filter för kategorier */}
      <div>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={categoryFilter.includes(category)}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategoryFilter([...categoryFilter, category]);
                } else {
                  setCategoryFilter(
                    categoryFilter.filter((c) => c !== category)
                  );
                }
              }}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Sortering */}
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="asc">Deadline - Stigande</option>
        <option value="desc">Deadline - Fallande</option>
      </select>

      {/* Lista med todos */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Tidsestimat: {todo.timeEstimate} min</p>
            <p>Deadline: {todo.deadline}</p>
            <button onClick={() => toggleStatus(todo.id)}>
              Markera som{" "}
              {todo.status === "Slutförd" ? "Ej utförd" : "Slutförd"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Ta bort</button>
            {/* Redigera knappar och funktionalitet kan läggas till här */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
