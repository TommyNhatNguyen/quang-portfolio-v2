export type StrapiBlocksTextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type StrapiBlocksLinkNode = {
  type: "link";
  url: string;
  children: StrapiBlocksTextNode[];
};

export type StrapiBlocksInlineNode = StrapiBlocksTextNode | StrapiBlocksLinkNode;

export type StrapiBlocksListItemNode = {
  type: "list-item";
  children: StrapiBlocksInlineNode[];
};

export type StrapiBlocksNode =
  | { type: "paragraph"; children: StrapiBlocksInlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: StrapiBlocksInlineNode[] }
  | { type: "quote"; children: StrapiBlocksInlineNode[] }
  | { type: "code"; children: StrapiBlocksTextNode[] }
  | {
      type: "list";
      format: "ordered" | "unordered";
      children: StrapiBlocksListItemNode[];
    }
  | {
      type: "image";
      image: {
        url: string;
        alternativeText?: string | null;
        caption?: string | null;
        width: number;
        height: number;
      };
      children: [];
    };

export type StrapiBlocksContent = StrapiBlocksNode[];
