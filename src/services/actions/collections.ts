"use server";
// mutations and revalidate tag must run on the server as uses secret env vars

import { revalidateTag } from "next/cache";
// TODO: check all validations are correct

// CONNECTS TO EXPRESS API

export async function deleteCollection(id: string) {
  const res = await fetch(`${process.env.API_URL}/collection/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Delete collection failed");
    // TODO: Surface meaningful error to logging service
  }
  // Make future renders refetch anything tagged "allCollections"
  revalidateTag("allCollections");
}

export async function updateCollection(
  id: number,
  name?: string,
  icon?: string
) {
  if (name == null && icon == null) {
    throw new Error("Nothing to update");
  }

  const res = await fetch(`${process.env.API_URL}/collection/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(name && { collection_name: name }),
      ...(icon && { icon }),
    }),
  });

  if (!res.ok) {
    throw new Error("Update collection failed");
    // TODO: send meaningful error to logging service
  }

  revalidateTag(`collection:${id}`);
  revalidateTag("allCollections");
  const data = await res.json();
  return data.collection;
}

// is possible to connect directly to DB but will not in this case (example below)
// "use server";
// import { db } from "@/lib/db";
//
// export async function deleteCollection(id: string) {
//   await db.collection.delete({ where: { id } });
//   revalidateTag("collections");
// }