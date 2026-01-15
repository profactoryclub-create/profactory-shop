export default function CancelPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-zinc-800 bg-zinc-950 rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold">Pago cancelado</h1>
        <p className="mt-2 text-zinc-400">
          No pasa nada. Puedes intentarlo de nuevo cuando quieras.
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

