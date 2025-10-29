import ItemCard from "@/app/collections/[collectionId]/items/ItemCard";
import { getItemsByCollectionId } from "@/services/api/items";
import { getCollectionById } from "@/services/api/collections";
import { Items } from "chartsy-types";
import { Typography } from "@mui/material";
import React from "react";
import ItemsGrid from "@/app/collections/[collectionId]/items/ItemsGrid";

// params are automatically handed to pages (not root) but are async in dynamic routes
// need to type params as a promise and await getting content in async components and use React.use in client components:
// https://nextjs.org/docs/messages/sync-dynamic-apis
type Props = { params: Promise<{ collectionId: string }> };

export default async function CollectionPage({ params }: Props) {
  const { collectionId } = await params;
  const collection = await getCollectionById(collectionId);
  const initialItems: Items = await getItemsByCollectionId(collectionId);
  // TODO: add guards
  const collectionName = collection.collection_name;
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
      <ItemsGrid initialItems={initialItems} />

    </section>
  );
}
