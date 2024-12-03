import { INote } from "../types/post";

export const titleToSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const slugToTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const findNoteBySlug = (posts: INote[], slug: string) => {
  return posts?.find((post) => titleToSlug(post.title) === slug);
};
