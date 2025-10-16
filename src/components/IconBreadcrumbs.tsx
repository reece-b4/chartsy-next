"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useParams } from "next/navigation";
import collections from "@/../data/collections.json";
import items from "@/../data/items.json";
// icons and text not aligned

interface CollectionProperties {
  collectionName?: string;
  icon?: string;
}
const getCollectionNameById = (id: string): CollectionProperties => {
  const collection = collections.find((collection) => {
    return collection.id.toString() === id;
  });
  return {
    collectionName: collection?.collection_name,
    icon: collection?.icon,
  };
};

interface ItemProperties {
  itemName?: string;
  icon?: string;
}
const getItemPropertiesById = (id: string): ItemProperties => {
  const item = items.find((item) => {
    return item.id.toString() === id;
  });
  return { itemName: item?.item_name, icon: item?.icon };
};

export default function IconBreadcrumbs() {
  const params = useParams();

  const collectionProperties: CollectionProperties = params.collectionId
    ? getCollectionNameById(params.collectionId as string)
    : {};

  const itemProperties: ItemProperties = params.itemId
    ? getItemPropertiesById(params.itemId as string)
    : {};

  const collectionName = collectionProperties.collectionName;
  const collectionIcon = collectionProperties.icon;
  const itemName = itemProperties.itemName;
  const itemIcon = itemProperties.icon;

  type Crumb = { label: string; href?: string; icon: string };
  const breadcrumbs = [
    { label: "Collections", href: "/collections", icon: "🏠" },
    collectionName && {
      label: collectionName,
      href: `/collections/${params.collectionId}`,
      icon: collectionIcon,
    },
    itemName && { label: itemName, icon: itemIcon },
    // collectionName and itemName are conditionally added so filter out these values if they are falsy
    // type predicate: c is Crumb that c must of type crumb after filtering vs (c: Crumb) meaning c being passed in if of type crumb before filtering as it can be falsy at this point.
  ].filter((c): c is Crumb => Boolean(c));;

  return (
    <section>
      <Breadcrumbs
        className="w-full"
        separator="›"
        sx={{
          justifyContent: "center",
          display: "inline-flex",
          // necessary in combination of other nowrap below
          whiteSpace: "nowrap",
          // syntax for targeting nested MUI components below
          // necessary in combination of other nowrap above
          "& .MuiBreadcrumbs-ol": {
            flexWrap: "nowrap",
            width: "100%",
            justifyContent: "center",
          },
          "& .MuiBreadcrumbs-li span": {
            minWidth: 0,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whitespace: "nowrap",
            maxWidth: {
              // truncate to ellipses on xs screen sizes
              xs: "20vw",
              sm: "unset",
            },
          }, 
          "& a, & .MuiTypography-root": {
          },
        }}
        aria-label="breadcrumb">
        {/* mapping ensures separators do not exist in earlier routes as was not the case out of the box */}
        {breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return isLast ? (
            <Typography
              key={crumb.label}
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}>
              {crumb?.icon}
              <span>{crumb.label}</span>
            </Typography>
          ) : (
            <Link
              key={crumb.label}
              underline="hover"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              href={crumb.href!}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}>
                {crumb.icon}
                <span>{crumb.label}</span>
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </section>
  );
}
