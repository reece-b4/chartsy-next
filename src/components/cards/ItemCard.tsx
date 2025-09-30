"use client";

import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type Item = { id: number; item_name: string };

export default function ItemCard({ item, href }: { item: Item; href: string }) {
  return (
    <Link href={href} className="block">
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="subtitle1">{item.item_name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}