// app/week-8/item.js
export default function Item(props) {
  const { name, quantity, category, onSelect } = props;

  return (
    <div
      className="p-4 bg-white shadow-md rounded-lg my-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onSelect?.({ name, quantity, category })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect?.({ name, quantity, category });
      }}
      aria-label={`Select ${name}`}
    >
      <ul className="list-disc list-inside">
        <li className="text-lg font-semibold">
          Name: <span className="font-normal">{name}</span>
        </li>
        <li className="text-lg font-semibold">
          Quantity: <span className="font-normal">{quantity}</span>
        </li>
        <li className="text-lg font-semibold">
          Category: <span className="font-normal">{category}</span>
        </li>
      </ul>
    </div>
  );
}
