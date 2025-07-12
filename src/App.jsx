import React, { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";

export default function App() {
  const allItems = [
    {
      id: 1,
      title: "Denim Jacket",
      image: "/denim jack.jpg",
      size: "M",
      condition: "Like New",
      category: "Outerwear"
    },
    {
      id: 2,
      title: "Floral Dress",
      image: "/floral dress.jpg",
      size: "S",
      condition: "Gently Used",
      category: "Dresses"
    },
    {
      id: 3,
      title: "Black Sneaker",
      image: "/sneaker.jpg",
      size: "8",
      condition: "Like New",
      category: "Shoes"
    },
    {
      id: 4,
      title: "Casual T-shirt",
      image: "/casual t.jpg",
      size: "L",
      condition: "Good",
      category: "Tops"
    },
    {
      id: 5,
      title: "Cargo Pants",
      image: "/cargo.jpg",
      size: "M",
      condition: "Like New",
      category: "Bottoms"
    },
    {
      id: 6,
      title: "Woolen Scarf",
      image: "/Scarf.jpg",
      size: "Free Size",
      condition: "New",
      category: "Accessories"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(allItems);

  const handleSearch = () => {
    const filtered = allItems.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleCategoryFilter = (category) => {
    const filtered = allItems.filter((item) => item.category === category);
    setFilteredItems(filtered);
  };

  const categories = [
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Accessories",
    "Shoes",
    "Ethnic Wear",
    "Activewear"
  ];

  return (
    <div className="bg-bg text-textDark font-sans min-h-screen">
      <Navbar />

      {/* Search */}
      <section className="bg-[#FAF7FF] py-6 px-4 flex justify-center">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search for clothing items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A9FF] text-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-[#6C3BFF] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 text-sm"
          >
            Search
          </button>
        </div>
      </section>

      {/* Hero */}
      <section className="text-center px-6 py-16 bg-secondaryBg">
        <h2 className="text-4xl font-bold mb-4">Join the Sustainable Fashion Movement</h2>
        <p className="text-lg max-w-xl mx-auto">
          ReWear helps you exchange unused clothing through direct swaps or a point-based
          redemption system. Reduce textile waste and refresh your wardrobe sustainably.
        </p>
      </section>

      {/* Categories */}
      <section className="bg-[#EFE6FF] py-8 px-4">
        <h2 className="text-2xl font-bold text-center text-[#2A2A2A] mb-6">Browse by Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {categories.map((category, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryFilter(category)}
              className="bg-white rounded-lg shadow-md text-center py-4 px-2 hover:bg-[#D1A9FF] transition cursor-pointer"
            >
              <p className="text-[#2A2A2A] font-semibold">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Listings */}
      <section className="py-10 px-4 bg-[#FAF7FF]">
        <h2 className="text-2xl font-bold text-center text-[#2A2A2A] mb-8">Latest Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2A2A2A] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Size: {item.size} | Condition: {item.condition}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#6C3BFF] text-white py-1 px-2 rounded hover:bg-opacity-90 text-sm">
                    Swap Request
                  </button>
                  <button className="flex-1 bg-[#F8AFA6] text-[#2A2A2A] py-1 px-2 rounded hover:bg-opacity-90 text-sm">
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Items Carousel (Static Mock) */}
<section className="px-6 py-10 bg-[#FAF7FF]">
  <h3 className="text-2xl font-semibold mb-6 text-center text-[#2A2A2A]">Featured Items</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      {
        id: 1,
        title: "Beige Overcoat",
        image: "/overcoat.jpg",
        size: "L",
        condition: "Like New"
      },
      {
        id: 2,
        title: "Graphic T-shirt",
        image: "/graphic-tee.jpg",
        size: "M",
        condition: "Gently Used"
      },
      {
        id: 3,
        title: "Vintage Jeans",
        image: "/jeans.jpg",
        size: "32",
        condition: "Good"
      }
    ].map((item) => (
      <div key={item.id} className="bg-[#EFE6FF] p-4 rounded-lg shadow hover:shadow-lg transition">
        <div className="h-48 rounded mb-4 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <h4 className="font-bold text-lg text-[#2A2A2A] mb-1">{item.title}</h4>
        <p className="text-sm text-gray-700 mb-3">
          Size: {item.size} | Condition: {item.condition}
        </p>
        <div className="flex gap-2">
          <button className="flex-1 bg-[#6C3BFF] text-white py-1 px-2 rounded hover:bg-opacity-90 text-sm">
            Swap Request
          </button>
          <button className="flex-1 bg-[#F8AFA6] text-[#2A2A2A] py-1 px-2 rounded hover:bg-opacity-90 text-sm">
            Redeem
          </button>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Footer */}
      <footer className="bg-primary text-textLight text-center py-4 mt-10">
        <p>&copy; 2025 ReWear. All rights reserved.</p>
      </footer>
    </div>
  );
}
