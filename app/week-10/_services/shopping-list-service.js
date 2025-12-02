import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export async function getItems(userId) {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const itemsQuery = query(itemsRef);
    const querySnapshot = await getDocs(itemsQuery);
    const items = [];
    querySnapshot.forEach((docSnap) => {
      items.push({
        id: docSnap.id,   
        ...docSnap.data() 
      });
    });

    return items;
  } catch (error) {
    console.error("Error getting items:", error);
    return [];
  }
}

export async function addItem(userId, item) {
  try {
    const itemsRef = collection(db, "users", userId, "items");

    const docRef = await addDoc(itemsRef, item);

    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}