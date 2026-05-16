import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { fetchHomePage } from "@/lib/sanity/queries";

export const Route = createFileRoute("/ua")({
  loader: async () => ({ content: await fetchHomePage() }),
  component: UaHomeRoute,
  head: () => ({
    meta: [
      { title: "OksiToys Amigurumi - Ручні в'язані іграшки" },
      {
        name: "description",
        content:
          "Преміальні амігурумі з антиалергенної велюрової пряжі. М'які, безпечні, з любов'ю. Індивідуальні замовлення.",
      },
      { property: "og:title", content: "OksiToys Amigurumi - Handmade boutique" },
      {
        property: "og:description",
        content: "Ручні в'язані друзі з м'якої антиалергенної пряжі.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function UaHomeRoute() {
  const { content } = Route.useLoaderData();
  return <HomePage lang="ua" content={content} />;
}
