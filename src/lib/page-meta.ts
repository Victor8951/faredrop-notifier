import { useEffect } from "react";

type MetaTag = { name: string; content: string } | { property: string; content: string };

export type PageMeta = { title: string; meta?: MetaTag[] };

function upsertMeta(tag: MetaTag) {
  const [attr, key] = "name" in tag ? ["name", tag.name] : ["property", tag.property];
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", tag.content);
}

/** Sets the document title and meta tags for the current page (client-side). */
export function usePageMeta({ title, meta = [] }: PageMeta) {
  useEffect(() => {
    document.title = title;
    meta.forEach(upsertMeta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, JSON.stringify(meta)]);
}
