"use client";

import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Collection } from "chartsy-types";

type Props = { collection: Collection; href: string };

export default function CollectionCard({ collection, href }: Props) {
  return (
    // link component routes are prefetched by next when they enter the viewport
    // Static Route: the full route is prefetched.
    // Dynamic Route: prefetching is skipped, or the route is partially prefetched if loading.tsx is present.
    <Link href={href} className="block">
      <Card sx={{ marginBottom: "0.8rem" }}>
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
