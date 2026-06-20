"use client";
import {
  StrapiBlocksContent,
  StrapiBlocksInlineNode,
  StrapiBlocksTextNode,
} from "@/app/interface/strapi-blocks.interface";
import { getImage } from "@/app/utils/getImage";

function TextNode({ node }: { node: StrapiBlocksTextNode }) {
  let el: React.ReactNode = node.text;
  if (node.code) el = <code>{el}</code>;
  if (node.bold) el = <strong>{el}</strong>;
  if (node.italic) el = <em>{el}</em>;
  if (node.underline) el = <u>{el}</u>;
  if (node.strikethrough) el = <s>{el}</s>;
  return <>{el}</>;
}

function InlineNodes({ nodes }: { nodes: StrapiBlocksInlineNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        if (node.type === "link") {
          return (
            <a
              key={i}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {node.children.map((child, j) => (
                <TextNode key={j} node={child} />
              ))}
            </a>
          );
        }
        return <TextNode key={i} node={node} />;
      })}
    </>
  );
}

type Props = {
  content: StrapiBlocksContent;
};

const RichTextRenderer = ({ content }: Props) => {
  return (
    <>
      {content.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i}>
                <InlineNodes nodes={block.children} />
              </p>
            );

          case "heading": {
            const Tag = `h${block.level}` as
              | "h1"
              | "h2"
              | "h3"
              | "h4"
              | "h5"
              | "h6";
            return (
              <Tag key={i}>
                <InlineNodes nodes={block.children} />
              </Tag>
            );
          }

          case "quote":
            return (
              <blockquote key={i}>
                <p>
                  <InlineNodes nodes={block.children} />
                </p>
              </blockquote>
            );

          case "code":
            return (
              <pre key={i}>
                <code>{block.children.map((c) => c.text).join("")}</code>
              </pre>
            );

          case "list": {
            const ListTag = block.format === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={i}>
                {block.children.map((item, j) => (
                  <li key={j}>
                    <InlineNodes nodes={item.children} />
                  </li>
                ))}
              </ListTag>
            );
          }

          case "image":
            return (
              <figure key={i}>
                <img
                  src={getImage(block.image.url)}
                  alt={block.image.alternativeText ?? ""}
                  width={block.image.width}
                  height={block.image.height}
                />
                {block.image.caption && (
                  <figcaption>{block.image.caption}</figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default RichTextRenderer;
