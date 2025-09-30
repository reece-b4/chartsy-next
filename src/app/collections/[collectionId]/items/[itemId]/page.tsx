type Params = { params: { collectionId: string; itemId: string } };

export default async function ItemPage({ params }: Params) {
  const item = await getItem(Number(params.itemId));
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{item.item_name}</h1>
      <pre className="rounded bg-neutral-100 p-4 text-sm">
        {JSON.stringify(item, null, 2)}
      </pre>
    </section>
  );
}

async function getItem(id: number) {
  return { id, item_name: "Bench Press Log", data: [{ date: "2025-09-01", value: 80 }] };
}