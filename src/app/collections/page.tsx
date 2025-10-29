import { Typography } from "@mui/material";
import CollectionsGrid from "./[collectionId]/items/[itemId]/CollectionsGrid";
import { getAllCollections } from "@/services/api/collections";

// update items page to have items grid
// reset db button for demo purposes
// update items card to be like collections card using generic component?
// make reactive
// add more data for collections,items and itemdata
// add button to post new collections/items/itemData
// create modal
// update collection - form
// patch collection on complete update
// delete collection
// create collection
// same for items and itemdata
// conditional updated at
// updated at updates on any change to children? - would use join in the db
// ensure optimistic rendering on all mutation calls
// setloading visual
// can navbar be adapted to SSR
// remaining current todos before next functionality step - different data types > charts > insights
// check and test ui for all pages on all screens

// MODULE SCOPE: pure functions/utilities, type definitions, config and constants, data fetcher definitions

export default async function CollectionsPage() {
  // COMPONENT SCOPE: awaits, fetching/DB reads, anything using params/headers/hooks/cookies, stateful logic, timers
  const collections = await getAllCollections();
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
        Collections
      </Typography>
      <CollectionsGrid initialCollections={collections} />
    </section>
  );
}
