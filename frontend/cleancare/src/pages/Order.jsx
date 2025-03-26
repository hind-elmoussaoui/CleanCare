import React, { useState } from "react";

const products = [
  { id: 1, name: "Autoclave Modern", price: 20, image: "autoclave.jpg" },
  { id: 2, name: "Mop and Bucket", price: 24, image: "mop.jpg" },
];

const categories = [
  { name: "Cleaning", count: 3 },
  { name: "Maintenance", count: 4 },
  { name: "Tools", count: 7 },
  { name: "Uncategorized", count: 0 },
  { name: "Washing", count: 1 },
];

export default function Shop() {
  const [priceRange, setPriceRange] = useState([20, 30]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-4 gap-8">
        {/* Products Section */}
        <div className="col-span-3 grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border-2 border-red-500 p-4 rounded-lg"
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="flex justify-between items-center mt-2">
                <span className="text-blue-500 font-bold">${product.price}</span>
                <button className="bg-red-500 text-white px-4 py-1 rounded">
                  Add to cart
                </button>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            </div>
          ))}
        </div>

        {/* Filter Sidebar */}
        <div className="bg-blue-900 text-white p-4 rounded-lg">
          <div className="mb-6">
            <h2 className="bg-yellow-400 text-black p-2 font-bold inline-block">
              Filter by price
            </h2>
            <input
              type="range"
              min="20"
              max="30"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full mt-2"
            />
            <p>Price: ${priceRange[0]} - ${priceRange[1]}</p>
            <button className="bg-red-500 text-white px-4 py-1 rounded mt-2 w-full">
              Filter
            </button>
          </div>
          
          {/* Categories */}
          <div>
            <h2 className="bg-yellow-400 text-black p-2 font-bold inline-block">
              Product categories
            </h2>
            <ul className="mt-2">
              {categories.map((cat) => (
                <li key={cat.name} className="flex justify-between">
                  {cat.name} <span>({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
