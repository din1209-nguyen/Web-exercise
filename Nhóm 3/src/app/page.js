export const dynamic = "force-dynamic";

async function getRandomShirt() {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shirts",
    { cache: "no-store" }
  );
  const data = await res.json();
  const products = data.products;
  return products[Math.floor(Math.random() * products.length)];
}

export default async function FashionPage() {
  const product = await getRandomShirt();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-5">
        <h1 className="text-3xl font-bold text-center mb-4">
          Fashion Trending 2026
        </h1>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover rounded-2xl mb-4"
        />

        <span className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-3">
          New Arrival
        </span>

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-2xl font-bold text-red-600">${product.price}</p>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-xl mt-4 hover:bg-gray-800 transition">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}