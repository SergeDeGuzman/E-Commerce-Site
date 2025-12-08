import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import Pagination from './Pagination';

const PRODUCT_PER_PAGE = 10;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const res = await wixClient.products
    .queryProducts()
    .startsWith('name', searchParams?.name || '')
    // .eq('collectionIds', categoryId)
    // .hasSome('productType', [searchParams?.type || 'physical', 'digital'])
    // .gt('priceData.price', searchParams?.min || 0)
    // .lt('priceData.price', searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    )
    .find();

  // console.log(res.items[0]);

  //EQUIVALENT TO THE WIX QUERY BUILDER
  const productsToDisplay = res.items.filter((product: any) => {
    const allowedTypes = searchParams?.type
      ? [searchParams.type]
      : ['physical', 'digital'];

    const minPrice = Number(searchParams?.min) || 1; //not 0 to hide the product as category
    const maxPrice = Number(searchParams?.max) || 999999;

    const price = product.priceData?.price ?? 0;

    return (
      product.collectionIds?.includes(categoryId) &&
      allowedTypes.includes(product.productType) &&
      price >= minPrice &&
      price <= maxPrice
    );
  });

  //EQUIVALENT TO .ascending and .descending wix query builder
  if (searchParams?.sort) {
    const [sortType] = searchParams.sort.split(' ');

    productsToDisplay.sort((a: any, b: any) => {
      const priceA = a.priceData?.price ?? 0;
      const priceB = b.priceData?.price ?? 0;

      return sortType === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

  // console.log(productsToDisplay);

  // const page = parseInt(searchParams?.page || '0');
  // const limitPerPage = limit || PRODUCT_PER_PAGE;

  // const paginatedProducts = productsToDisplay.slice(
  //   page * limitPerPage,
  //   page * limitPerPage + limitPerPage
  // );
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {productsToDisplay.map((product: products.Product) => (
        <Link
          href={'/' + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || '/product.png'}
              alt=""
              fill
              sizes="225vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            ></Image>
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || '/product.png'}
                alt=""
                fill
                sizes="225vw"
                className="absolute object-cover rounded-md "
              ></Image>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === 'shortDesc'
                  )?.description || ''
                ),
              }}
            ></div>
          )}
          <button className="rounded-2xl ring-1 ring-serge text-serge w-max py-2 px-4 text-xs hover:bg-serge hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      ></Pagination>
    </div>
  );
};

export default ProductList;
