"use client";

import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import { Item } from "chartsy-types";
import Button from "@mui/material/Button";
import { fmt } from "@/lib/utils";
import * as React from "react";

type Props = {
  item: Item;
  href: string;
  onDelete?: () => void;
  deleting?: boolean;
};

export default function ItemCard({ item, href, onDelete, deleting }: Props) {
  const created = React.useMemo(
    () => fmt.format(new Date(item.created_at)),
    [item.created_at]
  );
  return (
    <Card sx={{ marginBottom: "0.8rem" }}>
      <CardActionArea component={Link} href={href}>
        <CardContent sx={{ pb: 0 }}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
              mb: 1.5,
            }}>
            created: {created}
          </Typography>
          <Divider></Divider>
          <Typography
            variant="subtitle1"
            sx={{ mt: 1.5, textAlign: "center", fontSize: "1.2rem" }}>
            {item.icon ?? "📁"}&nbsp;&nbsp;&nbsp;
            {item.item_name}
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
            aria-label={`Delete ${item.item_name}`}>
            delete
          </Button>
        )}
        <Button size="small">insights</Button>
      </CardActions>
    </Card>
  );
}
