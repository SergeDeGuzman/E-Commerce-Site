import Add from '@/components/Add';
import CustomizeProducts from '@/components/CustomizeProducts';
import ProductImages from '@/components/ProductImages';
import React from 'react';

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages></ProductImages>
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo maxime
          qui neque voluptas velit quos vero assumenda beatae tempore vel a
          quisquam, inventore alias commodi dicta quaerat excepturi non.
          Consequatur?
        </p>
        <div className="h-[2px] bg-gray-100" /> {/*LINE*/}
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">32</h3>
          <h2 className="font-medium text-2xl">22</h2>
        </div>
        <div className="h-[2px] bg-gray-100" /> {/*LINE*/}
        <CustomizeProducts></CustomizeProducts>
        <Add></Add>
        <div className="h-[2px] bg-gray-100" /> {/*LINE*/}
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim culpa
            quasi ex sit odio at dolor fuga exercitationem, molestiae atque ab
            totam. Ex expedita, corporis facilis in quod iste nemo.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim culpa
            quasi ex sit odio at dolor fuga exercitationem, molestiae atque ab
            totam. Ex expedita, corporis facilis in quod iste nemo.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim culpa
            quasi ex sit odio at dolor fuga exercitationem, molestiae atque ab
            totam. Ex expedita, corporis facilis in quod iste nemo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
