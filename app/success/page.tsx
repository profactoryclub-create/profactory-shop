export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-zinc-800 bg-zinc-950 rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold">Pago completado ✅</h1>
        <p className="mt-2 text-zinc-400">
          Gracias por tu pedido. Te llegará un email de confirmación.
        </p>

        <a
          className="inline-block mt-6 w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold"
          href="/shop"
        >
          Volver a la tienda
        </a>
      </div>
    </main>
  );
}

