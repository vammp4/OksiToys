import { createClient } from "@sanity/client";

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Create a .env.local with VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET.`,
    );
  }
  return value;
}

export const sanityConfig = {
  projectId: required("VITE_SANITY_PROJECT_ID", import.meta.env.VITE_SANITY_PROJECT_ID),
  dataset: required("VITE_SANITY_DATASET", import.meta.env.VITE_SANITY_DATASET),
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2026-05-11",
  useCdn: (import.meta.env.VITE_SANITY_USE_CDN ?? "true") !== "false",
} as const;

/** Token only on SSR/server — never bundled for the browser (no VITE_ prefix). */
function serverToken(): string | undefined {
  if (import.meta.env.SSR) {
    return process.env.SANITY_AUTH_TOKEN;
  }
  return undefined;
}

export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  perspective: "published",
  token: serverToken(),
});
