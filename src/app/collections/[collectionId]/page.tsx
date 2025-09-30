import ItemCard from "@/components/cards/ItemCard";

type Params = { params: { collectionId: string } };

export default async function CollectionPage({ params }: Params) {
  const id = Number(params.collectionId);
  const { collection, items } = await getCollectionWithItems(id);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{collection.collection_name}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <ItemCard
            key={i.id}
            item={i}
            href={`/collections/${id}/items/${i.id}`}
          />
        ))}
      </div>
    </section>
  );
}

async function getCollectionWithItems(id: number) {
  return {
    collection: { id, collection_name: "Fitness", icon: "🏋️" },
    items: [
      { id: 101, item_name: "Bench Press Log" },
      { id: 102, item_name: "Run Times" },
    ],
  };
}