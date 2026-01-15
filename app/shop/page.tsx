"use client";

type Product = {
  id: string;
  name: string;
  category: "Hoodie" | "Tee";
  priceId: string;
};

const PRODUCTS: Product[] = [
  { id: "hoodie-1", name: "Hoodie 1", category: "Hoodie", priceId: "price_1SprC6LxcZ3jHn1MAEOk6WnR" },
  { id: "hoodie-2", name: "Hoodie 2", category: "Hoodie", priceId: "price_1SprCGLxcZ3jHn1MNByyDMfd" },
  { id: "hoodie-3", name: "Hoodie 3", category: "Hoodie", priceId: "price_1SprCRLxcZ3jHn1MhsGMReJG" },

  { id: "tee-1", name: "Camiseta 1", category: "Tee", priceId: "price_1SprBOLxcZ3jHn1MyjG3RQpH" },
  { id: "tee-2", name: "Camiseta 2", category: "Tee", priceId: "price_1SprBcLxcZ3jHn1MUfv9Mk7p" },
  { id: "tee-3", name: "Camiseta 3", category: "Tee", priceId: "price_1SprBrLxcZ3jHn1Mqa8snINS" },
];

async function createCheckout(priceId: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });

  if (!res.ok) {
    const txt = await res.text();
    alert("Error creando el pago:\n" + txt);
    return;
  }

  const data = await res.json();

  if (!data.url) {
    alert("Stripe no devolvió una URL válida");
    return;
  }

  window.location.href = data.url;
}

export default function ShopPage() {
  const hoodies = PRODUCTS.filter(p => p.category === "Hoodie");
  const tees = PRODUCTS.filter(p => p.category === "Tee");

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">PRO FACTORY SHOP</h1>

      <h2 className="text-xl mb-3">Hoodies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {hoodies.map(p => (
          <div key={p.id} className="border border-zinc-800 p-4 rounded-xl">
            <div className="aspect-square bg-zinc-900 mb-3" />
            <h3>{p.name}</h3>
            <button
              onClick={() => createCheckout(p.priceId)}
              className="mt-3 w-full bg-yellow-500 text-black py-2 rounded-xl"
            >
              Comprar
            </button>
            <p className="text-xs text-zinc-400 mt-2">Tallas: M / L / XL</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl mb-3">Camisetas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tees.map(p => (
          <div key={p.id} className="border border-zinc-800 p-4 rounded-xl">
            <div className="aspect-square bg-zinc-900 mb-3" />
            <h3>{p.name}</h3>
            <button
              onClick={() => createCheckout(p.priceId)}
              className="mt-3 w-full bg-yellow-500 text-black py-2 rounded-xl"
            >
              Comprar
            </button>
            <p className="text-xs text-zinc-400 mt-2">Tallas: M / L / XL</p>
          </div>
        ))}
      </div>
    </main>
  );
}

