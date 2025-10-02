import CollectionCard from "@/components/cards/CollectionCard";
import collections from "@/../data/collections.json";
import { Typography } from "@mui/material";

export default async function CollectionsPage() {
  // Server-side fetch (swap this for DB/API)
  // useEffect
  const collections = await getCollections();
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
          marginBottom: "1rem"
        }}>
        Collections
      </Typography>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} href={`/collections/${c.id}`} />
        ))}
      </div>
    </section>
  );
}

const getCollections = async () => {
  return collections;
}
