import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import { Suspense } from 'react';
import Image from 'next/image';

const CATEGORY_SLUG_MAP: { [key: string]: string | undefined } = {
  't-shirt': process.env.TSHIRT_CATEGORY_ID,
  // Add other slugs and their corresponding ENV variables here
};

const FALLBACK_COLLECTION_ID = process.env.FALLBACK_COLLECTION_ID || '';

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const categorySlug = searchParams.cat as string;

  let targetCategoryId: string;

  if (categorySlug) {
    // Look up the corresponding ID in the static map using the slug
    const mappedId = CATEGORY_SLUG_MAP[categorySlug.toLowerCase()];

    if (mappedId) {
      targetCategoryId = mappedId;
    } else {
      // If the slug doesn't match any entry, use the fallback ID.
      targetCategoryId = FALLBACK_COLLECTION_ID;
      console.warn(
        `Category slug '${categorySlug}' not found in map. Using fallback ID.`
      );
    }
  } else {
    // If no category slug is provided in searchParams, use the fallback (e.g., "All Products").
    targetCategoryId = FALLBACK_COLLECTION_ID;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on <br />
            Selected Products
          </h1>
          <button className="rounded-3xl bg-serge text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
            src="/woman.png"
            alt=""
            fill
            className="object-contain"
          ></Image>
        </div>
      </div>
      {/* FILTER */}
      <Filter></Filter>
      {/* PRODUCT */}
      <h1 className="mt-12 text-xl font-semibold">
        {categorySlug
          ? `Products in ${categorySlug.toUpperCase()}!`
          : 'All Products!'}
      </h1>
      <Suspense fallback={'loading...'}>
        {/* Pass the determined ID */}
        <ProductList
          categoryId={targetCategoryId}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
