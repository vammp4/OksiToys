import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";

export const Route = createFileRoute("/ua")({
  component: () => <HomePage lang="ua" />,
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
