"use client";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Collection } from "chartsy-types";
import * as React from "react";
import { fmt } from "@/lib/utils";

type Props = {
  collection: Collection;
  href: string;
  onDelete?: () => void;
  deleting?: boolean;
};

export default function CollectionCard({
  collection,
  href,
  onDelete,
  deleting,
}: Props) {
  const updated = null;
  // cache output via useMemo as this will only need to be calculated once
  const created = React.useMemo(
    () => fmt.format(new Date(collection.created_at)),
    [collection.created_at]
  );
  // TODO: implement showUpdated for any changes in child itemData
  const showUpdated = false;
  return (
    // link component routes are prefetched by next when they enter the viewport. will still do so using CardActionArea component=link
    // Static Route: the full route is prefetched.
    // Dynamic Route: prefetching is skipped, or the route is partially prefetched if loading.tsx is present.
    <Card sx={{ marginBottom: "0.8rem" }}>
      {/* action area makes whole area clickable with sematic correctness (button/a) and provides visual feedback */}
      <CardActionArea component={Link} href={href}>
        <CardContent sx={{ pb: 0 }}>
          {showUpdated}
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
              mb: showUpdated ? 0 : 1.5,
            }}>
            created: {created}
          </Typography>
          {showUpdated && (
            <Typography sx={{ color: "text.secondary", mb: 1.5, fontSize: 14 }}>
              updated: {updated}
            </Typography>
          )}
          <Divider></Divider>
          <Typography
            variant="subtitle1"
            sx={{ mt: 1.5, textAlign: "center", fontSize: "1.2rem" }}>
            {collection.icon ?? "📁"}&nbsp;&nbsp;&nbsp;
            {collection.collection_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">update</Button>
        {onDelete && (
          <Button
            size="small"
            onClick={onDelete}
            disabled={deleting}
            aria-label={`Delete ${collection.collection_name}`}>
            delete
          </Button>
        )}
        <Button size="small">insights</Button>
      </CardActions>
    </Card>
  );
}
