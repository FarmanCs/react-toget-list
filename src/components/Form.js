import { useState } from "react";

// function Form({ onAddItems }) {
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmite(e) {
    e.preventDefault();
    // console.log(e);
    if (!description) return;
    const newItem = { description, quantity, package: false, id: Date.now() };
    // console.log(newItem);
    onAddItems(newItem);

    //this was jus for learning to knwo how data transper b/w chaild to parent
    // onAddItems((Item) => [...Item, newItem]);
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
