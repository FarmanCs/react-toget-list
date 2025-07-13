import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Passports", quantity: 2, packed: false },
  { id: 4, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <Packinglist />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>😎 Far away⛷👁</h1>;
}
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmite(e) {
    e.preventDefault();
    // console.log(e);
    if (!description) return;
    const newItem = { description, quantity, package: false, id: Date.now() };
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmite}>
      <h3>What do you need for you Trip?</h3>
      <select
        value={quantity}
        onChange={(q) => setQuantity(Number(q.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => {
          // console.log(e.target);
          setDescription(e.target.value);
        }}
      />
      <button>add</button>
    </form>
  );
}
function Packinglist() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button className="btn">&times;</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X item on you list and you already pick X (X%)</em>
    </footer>
  );
}
