"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
    
  const [items, setItems] = useState(itemsData);
  const [sortBy, setSortBy] = useState("name");

  let itemArray = items.map(item => ({...item}));

  if (sortBy !== "group") {
    if (sortBy === "name") {
      itemArray.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortBy === "category") {
      itemArray.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    }
  }

  const groupedItems = itemArray.reduce((groups, item) => {
    const cat = item.category;
    if (!groups[cat]) {
      groups[cat] = [];
    }
    groups[cat].push(item);
    return groups;
  }, {});

  const sortedCategoryNames = Object.keys(groupedItems)
    .sort((a, b) => a.localeCompare(b));

  sortedCategoryNames.forEach((cat) => {
    groupedItems[cat].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  });

  const buttonBase =
    "px-3 py-1 rounded text-sm font-medium border border-gray-300 transition-colors";
  const activeClasses = "bg-blue-600 text-white border-blue-600";
  const inactiveClasses = "bg-white text-gray-800 hover:bg-gray-100";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSortBy("name")}
          className={`${buttonBase} ${
            sortBy === "name" ? activeClasses : inactiveClasses
          }`}
        >
          Sort by Name
        </button>

        <button
          type="button"
          onClick={() => setSortBy("category")}
          className={`${buttonBase} ${
            sortBy === "category" ? activeClasses : inactiveClasses
          }`}
        >
          Sort by Category
        </button>

        <button
          type="button"
          onClick={() => setSortBy("group")}
          className={`${buttonBase} ${
            sortBy === "group" ? activeClasses : inactiveClasses
          }`}
        >
          Group by Category
        </button>
      </div>

      {sortBy !== "group" && (
        <ul className="list-none p-0">
          {itemArray.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {sortBy === "group" && (
        <div className="flex flex-col gap-6">
          {sortedCategoryNames.map((categoryName) => (
            <div key={categoryName}>
              <h2 className="text-lg font-semibold capitalize mb-2">
                {categoryName}
              </h2>
              <ul className="list-none p-0">
                {groupedItems[categoryName].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}