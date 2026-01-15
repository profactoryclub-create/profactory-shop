import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return new Response("Missing priceId", { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,

      // Selector de talla
      custom_fields: [
        {
          key: "size",
          label: {
            type: "custom",
            custom: "Talla",
          },
          type: "dropdown",
          dropdown: {
            options: [
              { label: "M", value: "M" },
              { label: "L", value: "L" },
              { label: "XL", value: "XL" },
            ],
          },
        },
      ],

      // Dirección de envío (ventas globales)
      shipping_address_collection: {
        allowed_countries: [
          "ES","FR","DE","IT","PT","GB","IE",
          "US","CA","MX",
          "AU","NZ",
          "JP"
        ],
      },
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    return new Response(err.message || "Stripe error", { status: 500 });
  }
}

