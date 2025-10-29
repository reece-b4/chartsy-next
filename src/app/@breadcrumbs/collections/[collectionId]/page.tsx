import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs/Breadcrumbs";
import { getCollectionById } from "@/services/api/collections";

type Props = { params: Promise<{ collectionId: string }> };

export default async function BreadcrumbSlot({ params }: Props) {
  const collectionId = (await params).collectionId;
  const collection = await getCollectionById(collectionId);

//   collections route

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
      </BreadcrumbList>
    </section>
  );
}
