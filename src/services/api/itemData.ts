import { ItemDataArray, SingleItemData } from "chartsy-types";

export async function getAllItemData(): Promise<ItemDataArray> {
  const res = await fetch(`${process.env.API_URL}/item_data`, {
    next: { tags: ["allItemData"] },
  });
  if (!res.ok) throw new Error("Failed to load all item data");
  const data = await res.json();
  return data.item_data;
}

export async function getItemDataByItemId(id: string): Promise<ItemDataArray> {
    const res= await fetch(`${process.env.API_URL}/item_data?item_id=${id}`, {
        next: { tags: ["itemDataById"] },
    });
    if (!res.ok) throw new Error("Failed to load item data for item");
    const data = await res.json();
  return data.item_data;
}

export async function getItemDataById(id: string): Promise<SingleItemData> {
    const res = await fetch(`${process.env.API_URL}/item_data/${id}`, {
        next: {tags: ["singleItemData"]},
    });
if (!res.ok) throw new Error("Failed to load single item data");
  const data = await res.json();
  return data.item_data;
}