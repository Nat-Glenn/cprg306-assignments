"use client";

import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => Math.min(20, q + 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const atMin = quantity === 1;
  const atMax = quantity === 20;

  return (
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
            aria-label="Decrease"
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
            aria-label="Increase"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
