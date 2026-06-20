import { StrapiMedia } from "./media.interface";

export interface ActionButton {
  id: number;
  label: string;
  link: string;
  icon: StrapiMedia | null;
}

export interface SocialButton {
  id: number;
  label: string;
  link: string;
  icon: StrapiMedia | null;
}

export interface AboutPage {
  id: number;
  documentId: string;
  username: string;
  job_title: string;
  short_description: string;
  action_buttons: ActionButton[];
  social_buttons: SocialButton[];
  stack_images: StrapiMedia[];
  avatar: StrapiMedia;
  publishedAt: string;
}
