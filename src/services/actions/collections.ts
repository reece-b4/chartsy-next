"use server";

import { revalidateTag } from "next/cache";

// CONNECTS TO EXPRESS API

export async function deleteCollection(id: string) {
  const res = await fetch(`${process.env.API_URL}/collection/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    // Surface a meaningful error
    throw new Error("Delete collection failed");
  }
  // Make future renders refetch anything tagged "allCollections"
  revalidateTag("allCollections");
}

// is possible to connect directly to DB but will not in this case (example below)
// "use server";
// import { db } from "@/lib/db";
// 
// export async function deleteCollection(id: string) {
//   await db.collection.delete({ where: { id } });
//   revalidateTag("collections");
// }