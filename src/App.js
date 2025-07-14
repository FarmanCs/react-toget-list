import { useState } from "react";

export default function App() {
  const [item, setItem] = useState([]);

  function handleAddItems(item) {
    setItem((ItemsArry) => [...ItemsArry, item]); //this is the simple destructuring of array and add new item
  }

  function handlDeleteItem(id) {
    console.log(id);
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handdleToggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <Packinglist
        Items={item}
        onDeleteItem={handlDeleteItem}
        onToggleItem={handdleToggleItem}
      />

      {/* this was just to learn about how data flwo both wasy like parent to chaild and then chaild to parent */}
      {/* <Form onAddItems={setItem} />    */}
      {/* <Packinglist Items={item} updateState={setItem} /> */}
      <Stats Items={item} />
    </div>
  );
}
function Logo() {
  return <h1>😎 Far away⛷👁</h1>;
}
// function Form({ onAddItems }) {
function Form({ onAddItems }) {
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
//simple and more effecent way of leftupstat
function Packinglist({ Items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {Items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

//this is another way to update the sibling component via left up stat comunication from parent component to chalid and then back from chaild to parent her we pass the prop Item, updatestate to chaild Packinglist and then update the state with new item and updateStte after having some item that the parent know the new added item
// function Packinglist({ Items, updateState }) {
//   return (
//     <div className="list">
//       <ul>
//         {Items.map((item) => (
//           <Item item={item} key={item.id} />
//         ))}
//       </ul>
//       updateState(Item)
//     </div>
//   );
// }

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        // value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(e) => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}

function Stats({ Items }) {
  if (!Items.length)
    return (
      <p className="stats">
        <em>Start adding some stuff to your Tour List 🧑</em>
      </p>
    );

  const numItems = Items.length;
  const numPackedItem = Items.filter((item) => item.packed).length;
  const percentage = Math.round((numPackedItem / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got ready to go ✈"
          : ` You have ${numItems} item on you list and you already pick
        ${numPackedItem} (${percentage}%)`}
      </em>
    </footer>
  );
}
