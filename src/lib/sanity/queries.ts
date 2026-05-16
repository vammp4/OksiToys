import { sanityClient } from "./client";
import type { Lang } from "@/lib/i18n";

export type Localized = { pl?: string; en?: string; ua?: string };

export type LookbookItem = {
  _key: string;
  image: unknown;
  name?: Localized;
  tag?: Localized;
  active?: boolean;
};

export type ReviewItem = {
  _key: string;
  quote?: Localized;
  author: string;
  active?: boolean;
};

export type HomePageDoc = {
  lookbook?: LookbookItem[];
  customGallery?: unknown[];
  reviews?: ReviewItem[];
  copy?: {
    featuredTitle?: Localized;
    featuredSub?: Localized;
    customTitle?: Localized;
    customBody?: Localized;
    reviewsTitle?: Localized;
  };
};

const HOME_QUERY = /* groq */ `
*[_type == "homePage"][0]{
  lookbook[]{
    _key,
    active,
    image,
    name{pl,en,ua},
    tag{pl,en,ua}
  },
  customGallery[],
  reviews[]{
    _key,
    active,
    author,
    quote{pl,en,ua}
  },
  copy{
    featuredTitle{pl,en,ua},
    featuredSub{pl,en,ua},
    customTitle{pl,en,ua},
    customBody{pl,en,ua},
    reviewsTitle{pl,en,ua}
  }
}
`;

export async function fetchHomePage(): Promise<HomePageDoc | null> {
  const doc = await sanityClient.fetch<HomePageDoc | null>(HOME_QUERY);
  return doc ?? null;
}

export function pickLocalized(value: Localized | undefined, lang: Lang): string | undefined {
  if (!value) return undefined;
  return value[lang] ?? value.pl ?? value.en ?? value.ua;
}

