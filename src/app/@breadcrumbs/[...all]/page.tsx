import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/breadcrumbs/Breadcrumbs";
import React from "react";
import type { ReactElement } from "react";

// dynamic breadcrumbs pattern from: https://www.openstatus.dev/blog/dynamic-breadcrumb-nextjs
// each route has its own breadcrumb component to render depending on route ie, not one master component with conditional content
// this component: breadcrumb renderer

type Props = { params: Promise<{ all: string[] }> };

export default async function BreadcrumbSlot({ params }: Props) {
  const { all = [] } = await params;
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;
  for (let i = 0; i < all.length; i++) {
    const route = all[i];
    const href = "/" + all.slice(0, i + 1).join("/");
    if (i === all.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{route}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink href={href} className="capitalize">
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      );
    }
  }

  return (
    <section>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems}
          {breadcrumbPage}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
}
