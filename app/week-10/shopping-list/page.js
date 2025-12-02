"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import  { getItems, addItem } from "../_services/shopping-list-service";

// helper functions unchanged
function removeEmojis(str) {
  return str.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\uFE0E-\uFE0F])/g,
    ""
  );
}

function cleanItemName(name) {
  if (!name) return "";
  const base = name.split(",")[0];
  const noEmoji = removeEmojis(base);
  return noEmoji.trim();
}

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]); // initial state is an empty array
  const [selectedItemName, setSelectedItemName] = useState("");
  
  async function loadItems() {
  if (!user) return;             // no user, nothing to load
  try {
    const dbItems = await getItems(user.uid);
    setItems(dbItems);           // update state with items from Firestore
  } catch (err) {
    console.error("Error loading items:", err);
  }
}

useEffect(() => {
  loadItems();
}, [user]); // when user logs in or changes, reload items


  async function handleAddItem(item) {
  if (!user) return;   

  try {
    const newId = await addItem(user.uid, item); // write to Firestore
    const newItemWithId = { ...item, id: newId };

    setItems(prev => [...prev, newItemWithId]);
  } catch (err) {
    console.error("Error adding item:", err);
  }
}


  function handleItemSelect(item) {
    const cleaned = cleanItemName(item.name);
    setSelectedItemName(cleaned);
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Shopping List
        </h1>
        <p className="text-center text-gray-700">
          You must be logged in to view this page.
        </p>
        <div className="mt-4 text-center">
          <Link href="/week-9" className="text-blue-600 hover:underline">
            Go back to the login page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Shopping List
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
