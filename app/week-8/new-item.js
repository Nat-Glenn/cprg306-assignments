"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const increment = () => setQuantity(q => Math.min(20, q + 1));
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const makeId = () =>
    (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  const handleSubmit = (event) => {
    event.preventDefault();

    const itemObj = {
      id: makeId(),
      name,
      quantity,
      category, 
    };

    if (onAddItem) onAddItem(itemObj);

    setName("");
    setQuantity(1);
    setCategory("Produce");
  };

  const atMin = quantity === 1;
  const atMax = quantity === 20;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-gray-300 bg-white px-3 py-2 space-y-4"
    >
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700">Item Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full rounded-sm border border-gray-300 px-3 py-2 text-sm leading-none text-black"
          placeholder="Item Name"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700">Quantity:</label>
        <div className="rounded-sm border border-gray-300 bg-white px-3 py-2">
          <div className="flex items-center gap-2">
            <div
              className="rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm leading-none text-black tabular-nums"
              aria-live="polite"
            >
              {quantity}
            </div>

            <div className="inline-flex overflow-hidden rounded-md border border-blue-600">
              <button
                type="button"
                onClick={decrement}
                disabled={atMin}
                className={`px-2 py-1 text-xs leading-none text-white ${
                  atMin ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:opacity-90"
                }`}
                aria-label="Decrease quantity"
              >
                –
              </button>
              <button
                type="button"
                onClick={increment}
                disabled={atMax}
                className={`border-l border-blue-500 px-2 py-1 text-xs leading-none text-white ${
                  atMax ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:opacity-90"
                }`}
                aria-label="Increase qauntity"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700">Category:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full rounded-sm border border-gray-300 px-3 py-2 text-sm leading-none text-black"
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Frozen Foods">Frozen Foods</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Dry Goods">Dry Goods</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-sm bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Add Item
      </button>
    </form>
  );
}
