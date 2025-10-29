"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCollection } from "@/services/actions/collections";
import CollectionCard from "@/app/collections/CollectionCard";
import type { Collections } from "chartsy-types";

export default function CollectionsGrid({
  initialCollections,
}: {
  initialCollections: Collections;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Optimistically remove the item from the list
  const [optimisticCollections, removeOptimistic] = useOptimistic<
    Collections,
    string
  >(initialCollections, (state, id) => state.filter((c) => String(c.id) !== String(id)));

  async function handleDelete(id: string) {
    
    startTransition(async () => {
      // Instant UI update
      removeOptimistic(id);
      try {
        // delete from DB, then refresh the route to re-render server components
        await deleteCollection(id);
      } catch (e) {
        // TODO: rollback or toast an error
        // For full rollback keep previous state around.
        console.error(e);
      } finally {
        router.refresh();
      }
    });
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {optimisticCollections.map((c) => (
        <CollectionCard
          key={c.id}
          collection={c}
          href={`/collections/${c.id}`}
          onDelete={() => handleDelete(String(c.id))}
          // TODO: disable button/spinner
          deleting={isPending} 
        />
      ))}
      {optimisticCollections.length === 0 && <p>No collections found.</p>}
    </div>
  );
}