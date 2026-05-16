import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing/en")({
  staticData: { lang: "en" as const },
  component: () => null,
  head: () => ({
    meta: [
      { title: "OksiToys Amigurumi - Handmade crochet plush toys" },
      {
        name: "description",
        content:
          "Premium handmade amigurumi from hypoallergenic velvet yarn. Soft, safe, made with love. Custom orders available.",
      },
      { property: "og:title", content: "OksiToys Amigurumi - Handmade boutique" },
      {
        property: "og:description",
        content: "Handcrafted crochet companions made from soft, hypoallergenic velvet yarn.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});
