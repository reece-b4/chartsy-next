import { Collections, Collection } from "chartsy-types";

// CONNECTS TO EXPRESS API
// next fetch function is built on web fetch - using this vs axios is standard practice in nextjs as it allows for better integration with next features like caching, revalidation, and streaming

export async function getAllCollections(): Promise<Collections> {
  const res = await fetch(`${process.env.API_URL}/collections`, {
    // tags allow next to invalidate cached data on tag revalidation
    // caching negates the use of a store for some purposes as multiple requests will not be performed on valid cached date (use a store for client side ui state: open modals etc, multiple modules reading same state(not data), non-url state: in chartsy collection id is in url so is not appropriate for store)
    next: { tags: ["allCollections"] },
  });
  if (!res.ok) throw new Error("Failed to load collections");
  const data = await res.json();
  return data.collections;
}

export async function getCollectionById(id: string): Promise<Collection> {
  const res = await fetch(`${process.env.API_URL}/collection/${id}`, {
    next: { tags: [`collection:${id}`] },
  });
  if (!res.ok) throw new Error("Failed to load collection");
  const data = await res.json();
  return data.collection;
}
