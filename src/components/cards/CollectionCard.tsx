"use client";

import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Collection } from "chartsy-types";

export default function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <Link href={`/collections/${collection.id}`} className="block">
      <Card sx={{marginBottom: "0.8rem"}}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">
              {collection.icon ?? "📁"} {collection.collection_name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
