"use server";

import { revalidateTag } from "next/cache";

export async function deleteItem(id: string) {
  const res = await fetch(`${process.env.API_URL}/item/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Delete item failed");
  }
  revalidateTag("allItems");
}