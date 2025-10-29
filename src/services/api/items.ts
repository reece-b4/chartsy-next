import { Items, Item } from "chartsy-types";

export async function getAllItems(): Promise<Items> {
  const res = await fetch(`${process.env.API_URL}/items`, {
    next: { tags: ["allItems"] },
  });
  if (!res.ok) throw new Error("Failed to load all items");
  const data = await res.json();
  return data.items;
}

export async function getItemsByCollectionId(id: string): Promise<Items> {
    const res= await fetch(`${process.env.API_URL}/items?collection_id=${id}`, {
    next: { tags: ["CollectionsItems"] },
  });
  if (!res.ok) throw new Error("Failed to load items");
  const data = await res.json();
  return data.items;
}

export async function getItemById(id: string): Promise<Item> {
    const res = await fetch(`${process.env.API_URL}/item/${id}`, {
        next: {tags: ["item"]},
    });
if (!res.ok) throw new Error("Failed to load item");
  const data = await res.json();
  return data.item;
}