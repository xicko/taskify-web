import React from "react";
import DeltaOperation from "quill";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

interface RichTextProps {
  deltaJson: string;
  styles: string;
}

const RichTextRenderer: React.FC<RichTextProps> = ({ deltaJson, styles }) => {
  try {
    // Attempt to parse the JSON into Delta
    const delta = JSON.parse(deltaJson) as DeltaOperation[];

    // Convert Delta to HTML using QuillDeltaToHtmlConverter
    const converter = new QuillDeltaToHtmlConverter(delta, {
      paragraphTag: "p",
    });

    const html = converter.convert(); // Get the HTML from the Delta

    // If it's a valid Delta, render the HTML content
    return (
      <span
        className={`prose max-w-none dark:prose-invert ${styles}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (e) {
    console.log(e);
    // If parsing fails, treat it as plain text and display
    return <span className={`${styles}`}>{deltaJson}</span>;
  }
};

export default RichTextRenderer;
