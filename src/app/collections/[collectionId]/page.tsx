import ItemCard from "@/components/cards/ItemCard";
import items from "@/../data/items.json";
import collections from "@/../data/collections.json";
import { Item, Items } from "chartsy-types";
import { Typography } from "@mui/material";
import React from "react"

// params are automatically handed to pages but are async
// need to type params as a promise and await getting content in async components and use React.use in client components:
// https://nextjs.org/docs/messages/sync-dynamic-apis
type Props = { params: Promise<{ collectionId: string }>};


export default async function CollectionPage( { params }: Props) {
  const { collectionId } = await params
  const id: string = collectionId;
  const items: Items = await getItemsByCollectionId(id);
  // TODO: add guards
  const collectionName = getCollectionNameById(id) || "error";
  return (
    <section>
      <Typography
        variant="h4"
        noWrap
        sx={{
          fontWeight: 700,
          color: "var(--mui-palette-primary-main)",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}>
        {collectionName}
      </Typography>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((i) => (
          <ItemCard
            item={i}
            key={i.id}
            href={`/collections/${id}/items/${i.id}`}
          />
        ))}
      </div>
    </section>
  );
}

const getCollectionNameById = (id: string) => {
  const collection = collections.find(
    (collection) => {
       return collection.id.toString() === id}
  );
  return collection?.collection_name;
};

const getItemsByCollectionId = async (id: string) => {
  return items.filter((item: Item) => item.collection_id.toString() === id);
};
