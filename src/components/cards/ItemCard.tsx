"use client";

import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Item } from "chartsy-types";
type Props = { item: Item; href: string;};

export default function ItemCard( {item, href} : Props) {
  return (
    <Link href={href} className="block">
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="subtitle1"> {item.icon ?? "📁"} {item.item_name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
