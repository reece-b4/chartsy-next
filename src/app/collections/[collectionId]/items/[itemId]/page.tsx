import itemData from "@/../data/item_data.json";
import items from "@/../data/items.json";
import collections from "@/../data/collections.json";
import { SingleItemData, Collection, ItemDataArray } from "chartsy-types";
import { Typography } from "@mui/material";
import ItemDataCard from "@/components/cards/ItemDataCard";

type Params = { params: Promise<{ collectionId: string; itemId: string }> };

export default async function ItemPage({ params }: Params) {
  const { itemId, collectionId }: { itemId: string; collectionId: string } =
  await params;
  const collectionName: string = getCollectionNameById(collectionId);
  const itemData: ItemDataArray = await getItemData(itemId);
  const itemName: string = getItemNameById(itemId);

  return (
    <section className="space-y-4">
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
      <Typography
        variant="h5"
        noWrap
        sx={{
          fontWeight: 700,
          color: "var(--mui-palette-primary-main)",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}>
        {itemName}
      </Typography>
      <div className="rounded bg-neutral-100 p-4 text-sm">
        {itemData.map((i) => {
          return (
            <div key={i.id}>
              {/* TODO: if less than 10 items datas, use item data card, if more use mui accordian */}
              <ItemDataCard iData={i}>

              </ItemDataCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const getCollectionNameById = (id: string): string => {
  const collection = collections.find((collection: Collection) => {
    return collection.id.toString() === id;
  });
  return collection ? collection.collection_name : "no collection name";
};

const getItemNameById = (id: string): string => {
  const item = items.find((item) => {
    return item.id.toString() === id;
  });
  return item ? item.item_name : "no item name";
};

const getItemData = (id: string): ItemDataArray => {
  return itemData.filter((itemD: SingleItemData) => itemD.id === Number(id));
};
