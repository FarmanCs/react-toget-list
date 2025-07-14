import { useState } from "react";
import Item from "./Item";

//simple and more effecent way of leftupstat
// export default function Packinglist(props //once we rece the props like this the we need to do like props.Items, so its batter to directly destructure them like we did below
export default function Packinglist({
  //all these things are called destructuring of the passing props
  Items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortby, setSortBy] = useState("input");
  let sortedItems;
  if (sortby === "input") sortedItems = Items;

  if (sortby === "description")
    sortedItems = Items.slice().sort((a, b) =>
      a.description.localeCompare(b.description)
    );

  if (sortby === "packed")
    sortedItems = Items.slice().sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status </option>
        </select>
        <button onClick={onClearList}>clear List</button>
      </div>
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
