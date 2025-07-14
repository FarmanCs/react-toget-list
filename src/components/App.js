import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Packinglist from "./Packinglist";
import Stats from "./Stats";

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

  function handleClearList() {
    const conform = window.confirm("Are  you sure to clear the list!👨");

    conform && setItem([]);
  }

  return (
    <div className="app">
      {/*these things are called passing props to components acrose the app like here we have 'Form' component and we pass onAddItems as a props for using in 'Form' component. 'syntex for passing props are:' propsName ='{value of the particlue props it could be any thing like in this onAddItems case we pass function as a props} we pass any thing in props like function state etc
       */}
      <Logo />
      <Form onAddItems={handleAddItems} />
      <Packinglist
        Items={item}
        onDeleteItem={handlDeleteItem}
        onToggleItem={handdleToggleItem}
        onClearList={handleClearList}
      />
      {/* this was just to learn about how data flwo both wasy like parent to chaild and then chaild to parent */}
      {/* <Form onAddItems={setItem} />    */}
      {/* <Packinglist Items={item} updateState={setItem} /> */}
      <Stats Items={item} />
    </div>
  );
}
