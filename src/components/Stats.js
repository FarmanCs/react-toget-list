export default function Stats({ Items }) {
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
