import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { fetchHomePage } from "@/lib/sanity/queries";

export const Route = createFileRoute("/en")({
  loader: async () => ({ content: await fetchHomePage() }),
  component: EnHomeRoute,
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

function EnHomeRoute() {
  const { content } = Route.useLoaderData();
  return <HomePage key="en" lang="en" content={content} />;
}
