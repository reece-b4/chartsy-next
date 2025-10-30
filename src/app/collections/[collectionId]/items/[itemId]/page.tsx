import { ItemDataArray } from "chartsy-types";
import { Typography } from "@mui/material";
import ItemDataCard from "@/app/collections/[collectionId]/items/[itemId]/ItemDataCard";
import { getCollectionById } from "@/services/api/collections";
import { getItemById } from "@/services/api/items";
import { getItemDataByItemId } from "@/services/api/itemData";

type Params = { params: Promise<{ collectionId: string; itemId: string }> };

export default async function ItemPage({ params }: Params) {
  const { itemId, collectionId }: { itemId: string; collectionId: string } =
    await params;
  const collectionName: string = (await getCollectionById(collectionId))
    .collection_name;
  const itemData: ItemDataArray = await getItemDataByItemId(itemId);
  const itemName: string = (await getItemById(itemId)).item_name;

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
      <div className="w-full">
        {itemData.map((i) => {
          return (
            <div key={i.id}>
              {/* TODO: if less than 10 items datas, use item data card, if more use mui accordian */}
              <ItemDataCard iData={i}></ItemDataCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
