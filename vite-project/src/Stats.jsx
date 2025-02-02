export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>If you want to on vacation. Please list and item</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You have to go now"
          : `You have ${numItems} item on your list, and you already packed ${numPacked}
        (${percentage} %)`}
      </em>
    </footer>
  );
}
