import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon, ImageIcon, StarIcon, EditIcon } from "@sanity/icons";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "pl", title: "PL", type: "string" }),
      defineField({ name: "en", title: "EN", type: "string" }),
      defineField({ name: "ua", title: "UA", type: "string" }),
    ],
    options: { collapsible: true, collapsed: false },
  });

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Home",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "lookbook",
      title: "Lookbook (Kolekcja)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          icon: ImageIcon,
          name: "lookbookItem",
          title: "Lookbook item",
          fields: [
            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            localizedString("name", "Name"),
            localizedString("tag", "Tag"),
            defineField({
              name: "active",
              title: "Active",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "name.pl",
              subtitle: "tag.pl",
              media: "image",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(24).warning("Keep the lookbook under 24 items for best UX."),
    }),

    defineField({
      name: "customGallery",
      title: 'Na zamówienie (gallery)',
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
      validation: (rule) => rule.max(30).warning("Keep this gallery under 30 images."),
    }),

    defineField({
      name: "reviews",
      title: "Opinie / Reviews",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          icon: StarIcon,
          name: "review",
          title: "Review",
          fields: [
            localizedString("quote", "Quote"),
            defineField({
              name: "author",
              title: "Author name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "active",
              title: "Active",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "author",
              subtitle: "quote.pl",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(30).warning("Keep reviews under 30 items."),
    }),

    defineField({
      name: "copy",
      title: "Texts (editable copy)",
      type: "object",
      icon: EditIcon,
      options: { collapsible: true, collapsed: false },
      fields: [
        localizedString("featuredTitle", "Featured title"),
        localizedString("featuredSub", "Featured subtitle"),
        localizedString("customTitle", "Custom section title"),
        localizedString("customBody", "Custom section body"),
        localizedString("reviewsTitle", "Reviews title"),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title || "Home Page" }),
  },
});

