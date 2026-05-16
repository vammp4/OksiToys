import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { fetchHomePage } from "@/lib/sanity/queries";

export const Route = createFileRoute("/")({
  loader: async () => ({ content: await fetchHomePage() }),
  component: () => <HomePage lang="pl" content={Route.useLoaderData().content} />,
  head: () => ({
    meta: [
      { title: "OksiToys Amigurumi - Recznie robione szydelkowe maskotki" },
      {
        name: "description",
        content:
          "Premium handmade amigurumi z antyalergicznej wloczki. Miekkie, bezpieczne, robione z milosci. Personalizacja na zamowienie.",
      },
      { property: "og:title", content: "OksiToys Amigurumi - Handmade boutique" },
      {
        property: "og:description",
        content: "Recznie szydelkowane przytulanki z aksamitnej, antyalergicznej wloczki.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});
