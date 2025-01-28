import { useState } from "react";
import "./App.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggle={handleToggleItem}
        clearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏕️ Cammping Ground 🏕️</h1>;
}

function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    console.log(e);
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    addItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🀄 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          console.log(e.target);
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option key={i}>{i}</option>
        ))}
      </select>
      <input
        type="text"
        name=""
        id=""
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          console.log(e.target);
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggle, clearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onToggle={onToggle}
            onDeleteItem={onDeleteItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          name=""
          id=""
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggle }) {
  return (
    <div>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggle(item.id)}
          name=""
          id=""
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} - {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❎</button>
      </li>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        You have {numItems} items on your list, and you already packed{" "}
        {numPacked} ({percentage}%)
      </em>
    </footer>
  );
}

export default App;
