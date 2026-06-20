import { StrapiBlocksContent } from "./strapi-blocks.interface";
import { Category } from "./category.interface";
import { StrapiMedia } from "./media.interface";

export interface Article {
  id: number;
  documentId: string;
  title: string;
  short_description: string | null;
  slug: string;
  is_link: boolean;
  link: string | null;
  thumbnail: StrapiMedia;
  categories: Category[];
  content: StrapiBlocksContent;
  publishedAt: string;
}
