import React, { useMemo } from "react";
import { marked } from "marked";

// Configure marked for GitHub Flavored Markdown and preserved line breaks
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Normalizes and converts raw markdown or pasted text into rich HTML
 */
export const renderArticleHtml = (content) => {
  if (!content) return "";

  // 1. Normalize line endings (handles Windows \r\n and macOS \r)
  let text = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // 2. Convert with marked
  try {
    return marked.parse(text);
  } catch (error) {
    console.error("Markdown parsing error:", error);
    // Fallback to simple paragraph parser if markdown parsing fails
    return text
      .split(/\n\s*\n/)
      .map((p) => `<p>${p.trim().replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }
};

/**
 * Component to render formatted article body with headings, lists, bold text, and proper spacing
 */
const ArticleRenderer = ({ content, className = "" }) => {
  const html = useMemo(() => renderArticleHtml(content), [content]);

  return (
    <div
      className={`article-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ArticleRenderer;
