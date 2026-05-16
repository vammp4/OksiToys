import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || "production";

if (!projectId) {
  // eslint-disable-next-line no-console
  console.warn(
    'Missing SANITY project id. Set "VITE_SANITY_PROJECT_ID" (and optionally SANITY_STUDIO_PROJECT_ID).',
  );
}

export default defineConfig({
  name: "oksitoys-studio",
  title: "OksiToys Admin",
  projectId: projectId || "missing-project-id",
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
});

