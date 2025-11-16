"use client";

import { useEffect, useState } from "react";


export async function fetchMealIdeas(ingredient) {
  if (!ingredient || !ingredient.trim()) return [];
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ingredient.trim()
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error("MealDB fetch failed", res.status, res.statusText);
    return [];
  }
  const data = await res.json();
  return Array.isArray(data?.meals) ? data.meals : [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  async function loadMealIdeas() {
    const results = await fetchMealIdeas(ingredient);
    setMeals(results);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4">
      <h2 className="mb-3 text-xl font-semibold text-gray-800">
        Meal Ideas {ingredient ? `for “${ingredient}”` : ""}
      </h2>

      {ingredient && meals.length === 0 && (
        <p className="text-sm text-gray-500">No results (or enter a different ingredient).</p>
      )}

      {!ingredient && (
        <p className="text-sm text-gray-500">
          Select an item from your shopping list to see meal ideas.
        </p>
      )}

      <ul className="mt-3 list-disc list-inside">
        {meals.map((m) => (
          <li key={m.idMeal} className="py-1">
            {m.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}
