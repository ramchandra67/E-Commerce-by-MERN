import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(
      `/products?search=${search}&category=${category}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }
    const res = await api.post(`/cart/add`, { userId, productId });
    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-[#eaeded]">
      <div className="bg-[#232f3e] p-3 shadow-md">
        <div className="max-w-7xl mx-auto flex h-10 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-full bg-[#f3f3f3] text-gray-700 border-none px-3 rounded-l-md text-sm outline-none focus:ring-2 focus:ring-[#febd69] cursor-pointer"
          >
            <option value="">All</option>
            <option value="Laptops">Laptops</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Tablets">Tablets</option>
            <option value="Audio">Audio</option>
            <option value="Smartwatches">Smartwatches</option>
            <option value="Accessories">Accessories</option>
            <option value="Gaming">Gaming</option>
            <option value="Car">Car</option>



          </select>

          <input
            type="text"
            placeholder="Search Amazon.in"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-full px-4 text-white outline-none focus:ring-2 focus:ring-[#febd69]"
          />

          <button className="h-full bg-[#febd69] hover:bg-[#f3a847] px-5 rounded-r-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 flex flex-col border border-gray-200 rounded-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/product/${product._id}`} className="flex-1">
                <div className="h-48 flex items-center justify-center mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h2 className="text-gray-900 font-medium text-base line-clamp-2 hover:text-[#c45500]">
                  {product.title}
                </h2>
              </Link>

              <div className="mt-3">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-sm font-bold align-top">₹</span>
                  <span className="text-2xl font-bold">{product.price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">FREE Delivery by Amazon</p>

                <button
                  onClick={() => addToCart(product._id)}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black py-1.5 rounded-full text-sm font-medium border border-[#fcd200] shadow-sm active:scale-95 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}