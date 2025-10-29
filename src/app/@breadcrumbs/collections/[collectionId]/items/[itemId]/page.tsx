import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs/Breadcrumbs";
import { getCollectionById } from "@/services/api/collections";
import { getItemById } from "@/services/api/items";

type Props = { params: Promise<{ collectionId: string; itemId: string }> };

export default async function BreadcrumbSlot({ params }: Props) {
  const collectionId = (await params).collectionId;
  const itemId = (await params).itemId;
  const collection = await getCollectionById(collectionId);
  const item = await getItemById(itemId);

  return (
    <section>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
           <BreadcrumbLink 
		  href={`/collections/${collectionId}`} className="capitalize">
            {collection.collection_name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {item.item_name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </section>
  );
}
