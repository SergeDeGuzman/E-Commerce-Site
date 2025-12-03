'use client';

import Image from 'next/image';
import { useState } from 'react';

// const images = [
//   {
//     id: 1,
//     url: 'https://images.pexels.com/photos/34474293/pexels-photo-34474293.jpeg',
//   },
//   {
//     id: 2,
//     url: 'https://images.pexels.com/photos/34419127/pexels-photo-34419127.jpeg',
//   },
//   {
//     id: 3,
//     url: 'https://images.pexels.com/photos/34615940/pexels-photo-34615940.jpeg',
//   },
//   {
//     id: 4,
//     url: 'https://images.pexels.com/photos/34256053/pexels-photo-34256053.jpeg',
//   },
// ];

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          key={items.id}
          src={items[index].image?.url}
          alt=""
          fill
          sizes="30vw"
          className="object-cover rounded-md"
        ></Image>
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item: any, i: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={item.id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
