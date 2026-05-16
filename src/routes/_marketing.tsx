import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { fetchHomePage } from "@/lib/sanity/queries";
import { langFromStaticData } from "@/lib/i18n";

export const Route = createFileRoute("/_marketing")({
  loader: async () => ({ content: await fetchHomePage() }),
  staleTime: Infinity,
  component: MarketingLayout,
});

function MarketingLayout() {
  const { content } = Route.useLoaderData();
  const lang = useRouterState({
    select: (state) => {
      const leaf = state.matches[state.matches.length - 1];
      return langFromStaticData(leaf?.staticData);
    },
  });

  return (
    <>
      <HomePage lang={lang} content={content} />
      <Outlet />
    </>
  );
}
