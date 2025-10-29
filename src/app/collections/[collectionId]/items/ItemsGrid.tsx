"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteItem } from "@/services/actions/items";
import ItemCard from "@/app/collections/[collectionId]/items/ItemCard";
import type { Items } from "chartsy-types";
import { useParams } from 'next/navigation'

export default function ItemsGrid({
  initialItems,
}: {
  initialItems: Items;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const collectionId = useParams().collectionId
  const [optimisticItems, removeOptimistic] = useOptimistic<
    Items,
    string
  >(initialItems, (state, id) => state.filter((c) => String(c.id) !== String(id)));

  async function handleDelete(id: string) {
    
    startTransition(async () => {
      removeOptimistic(id);
      try {
        await deleteItem(id);
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
      {optimisticItems.map((i) => (
        <ItemCard
          key={i.id}
          item={i}
          href={`/collections/${collectionId}/items/${i.id}`}
          onDelete={() => handleDelete(String(i.id))}
          // TODO: disable button/spinner
          deleting={isPending} 
        />
      ))}
      {optimisticItems.length === 0 && <p>No items found.</p>}
    </div>
  );
}