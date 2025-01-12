import React, { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { TextEditorMenuBar } from "./TextEditorMenuBar";
import "../index.css";
import { CustomImage } from "./CustomImage";
import { useDebouncedCallback } from "use-debounce";
import Loader from "./Loader";
import { deleteFile, uploadFile } from "../Utils/Helper";

const TextAreaEditor = ({ initialContent, onContentChange }) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editorContent, setEditorContent] = useState({
    html: "",
    text: "",
    json: null,
    wordCount: 0,
    characterCount: 0,
  });
  const [isContentSaved, setIsContentSaved] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (!isContentSaved && uploadedImages.length > 0) {
        // Cancel the event as per the standard
        event.preventDefault();
        // Chrome requires returnValue to be set
        event.returnValue = "";
        try {
          if (uploadedImages.length === 1) {
            await deleteFile(uploadedImages[0]);
          }
        } catch (error) {
          console.error("Error deleting images:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [uploadedImages, isContentSaved]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "prose-heading", // Add this
          },
        },
      }),
      CustomImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
      TextStyle.configure({
        // Add this configuration
        HTMLAttributes: {
          class: "text-style",
        },
      }),
      Color.configure({
        // Add this configuration
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "highlighted-text",
        },
      }),
    ],
    content: initialContent || "<p>Hello World! Start typing...</p>",
    editorProps: {
      attributes: {
        class: "min-h-[200px] p-4 focus:outline-none prose max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      const json = editor.getJSON();
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      const wordCount = words.length;
      const characterCount = text.length;
      debouncedUpdate();
      setEditorContent({
        html,
        text,
        json,
        wordCount,
        characterCount,
      });
      setIsContentSaved(false);
    },
  });
  const debouncedUpdate = useDebouncedCallback(async () => {
    setSavedStatus(true);
    const { htmlContent } = handleDataExtraction();
    onContentChange?.(htmlContent);
    setTimeout(() => {
      setSavedStatus(false);
    }, 500);
    return { htmlContent };
  }, 750);
  // Example usage of the data functions
  const handleDataExtraction = () => {
    if (!editor) return;

    // Get the HTML content with preserved styling
    const htmlContent = editor.getHTML();

    // Create a temporary container to process the HTML
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = htmlContent;

    // Process text nodes for spaces and line breaks
    const processTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Replace multiple spaces with space + <br/>
        const text = node.textContent;
        if (text.includes("  ")) {
          const newContent = text.replace(/  +/g, " <br/>");
          const span = document.createElement("span");
          span.innerHTML = newContent;
          node.parentNode.replaceChild(span, node);
        }
      } else {
        // Recursively process child nodes
        node.childNodes.forEach(processTextNodes);
      }
    };

    // Process line breaks based on container width
    const processLineBreaks = () => {
      const editorWidth = editor.view.dom.offsetWidth;
      const textNodes = [];

      // Get all text nodes
      const walker = document.createTreeWalker(
        tempContainer,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      textNodes.forEach((textNode) => {
        const range = document.createRange();
        range.selectNodeContents(textNode);
        const rects = range.getClientRects();

        // If text node spans multiple lines, add <br/> at appropriate positions
        if (rects.length > 1) {
          let currentLine = "";
          const words = textNode.textContent.split(" ");
          const newContent = words.reduce((acc, word) => {
            currentLine += word + " ";
            if (currentLine.length * 8 > editorWidth) {
              // Approximate character width
              currentLine = "";
              return acc + word + " <br/>";
            }
            return acc + word + " ";
          }, "");

          const span = document.createElement("span");
          span.innerHTML = newContent.trim();
          textNode.parentNode.replaceChild(span, textNode);
        }
      });
    };

    // Process existing content
    processTextNodes(tempContainer);
    processLineBreaks();

    // Process all elements with background colors
    tempContainer
      .querySelectorAll('[style*="background-color"]')
      .forEach((el) => {
        const bgColor = el.style.backgroundColor;
        el.setAttribute("data-color", bgColor);
      });

    // Process heading elements and preserve their styles
    tempContainer.querySelectorAll("h1, h2, h3").forEach((heading) => {
      // Get computed styles for the heading
      const computedStyle = window.getComputedStyle(heading);

      // Preserve important heading properties
      const headingStyles = {
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        marginTop: computedStyle.marginTop,
        marginBottom: computedStyle.marginBottom,
        lineHeight: computedStyle.lineHeight,
      };

      // Set data attributes for each style property
      heading.setAttribute("data-font-size", headingStyles.fontSize);
      heading.setAttribute("data-font-weight", headingStyles.fontWeight);
      heading.setAttribute("data-margin-top", headingStyles.marginTop);
      heading.setAttribute("data-margin-bottom", headingStyles.marginBottom);
      heading.setAttribute("data-line-height", headingStyles.lineHeight);

      // Add a data attribute for heading level
      heading.setAttribute("data-heading-level", heading.tagName.toLowerCase());

      // Preserve any existing classes
      if (heading.className) {
        heading.setAttribute("data-original-classes", heading.className);
      }

      // Process text alignment within headings if present
      const textAlign = computedStyle.textAlign;
      if (textAlign && textAlign !== "start") {
        heading.setAttribute("data-text-align", textAlign);
      }
    });

    // Process text alignment on block elements
    tempContainer.querySelectorAll("p, div").forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      const textAlign = computedStyle.textAlign;
      if (
        textAlign &&
        textAlign !== "start" &&
        !el.hasAttribute("data-text-align")
      ) {
        el.setAttribute("data-text-align", textAlign);
      }
    });

    // Process bullet lists
    tempContainer.querySelectorAll("ul").forEach((ul) => {
      const styles = window.getComputedStyle(ul);

      ul.setAttribute("data-list-type", "bullet");
      ul.setAttribute("data-list-spacing", styles.marginBottom);
      ul.setAttribute("data-list-padding", styles.paddingLeft);

      // Process list items within bullet list
      ul.querySelectorAll("li").forEach((li) => {
        const liStyles = window.getComputedStyle(li);
        li.setAttribute("data-list-item-spacing", liStyles.marginBottom);
        li.setAttribute("data-list-style", "disc");

        // Process text alignment within list items if present
        const textAlign = liStyles.textAlign;
        if (textAlign && textAlign !== "start") {
          li.setAttribute("data-text-align", textAlign);
        }
      });
    });

    // Process ordered lists
    tempContainer.querySelectorAll("ol").forEach((ol) => {
      const styles = window.getComputedStyle(ol);

      ol.setAttribute("data-list-type", "ordered");
      ol.setAttribute("data-list-spacing", styles.marginBottom);
      ol.setAttribute("data-list-padding", styles.paddingLeft);

      // Process list items within ordered list
      ol.querySelectorAll("li").forEach((li) => {
        const liStyles = window.getComputedStyle(li);
        li.setAttribute("data-list-item-spacing", liStyles.marginBottom);
        li.setAttribute("data-list-style", "decimal");

        // Process text alignment within list items if present
        const textAlign = liStyles.textAlign;
        if (textAlign && textAlign !== "start") {
          li.setAttribute("data-text-align", textAlign);
        }
      });
    });

    // Process text color and highlight styles
    tempContainer
      .querySelectorAll('[style*="color"], [style*="background-color"]')
      .forEach((el) => {
        const computedStyle = window.getComputedStyle(el);

        // Process text color
        const color = computedStyle.color;
        if (color) {
          el.setAttribute("data-text-color", color);
        }

        // Process highlight color
        const backgroundColor = computedStyle.backgroundColor;
        if (backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)") {
          el.setAttribute("data-highlight-color", backgroundColor);
        }
      });

    // Process links
    tempContainer.querySelectorAll("a").forEach((link) => {
      const computedStyle = window.getComputedStyle(link);

      // Preserve link styles
      link.setAttribute("data-link-color", computedStyle.color);
      if (link.className) {
        link.setAttribute("data-original-classes", link.className);
      }
    });

    // Process images
    tempContainer.querySelectorAll("img").forEach((img) => {
      // Preserve image attributes and classes
      if (img.className) {
        img.setAttribute("data-original-classes", img.className);
      }

      // Preserve alignment if present
      const parentComputedStyle = window.getComputedStyle(img.parentElement);
      const textAlign = parentComputedStyle.textAlign;
      if (textAlign && textAlign !== "start") {
        img.parentElement.setAttribute("data-text-align", textAlign);
      }
    });

    // Add CSS Custom Properties for consistent styling
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      :root {
        --text-font: ${window.getComputedStyle(tempContainer).fontFamily};
        --text-size: ${window.getComputedStyle(tempContainer).fontSize};
        --text-color: ${window.getComputedStyle(tempContainer).color};
        --line-height: ${window.getComputedStyle(tempContainer).lineHeight};
      }
    `;
    tempContainer.insertBefore(styleElement, tempContainer.firstChild);

    // Wrap content in a container with editor width
    const wrappedHTML = `
      <div 
        style="
          width: ${editor.view.dom.offsetWidth}px;
          max-width: 100%;
          margin: 0 auto;
          font-family: var(--text-font);
          font-size: var(--text-size);
          color: var(--text-color);
          line-height: var(--line-height);
        "
      >
        ${tempContainer.innerHTML}
      </div>
    `;

    // Set the processed content
    setIsContentSaved(true);

    return {
      htmlContent: wrappedHTML,
    };
  };

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      if (!event.target.files?.length) return;
      const file = event.target.files[0];
      const reader = new FileReader();
      const imageUrl = await uploadFile(file);
      if (imageUrl) {
        setUploadedImages((prevImages) => [...prevImages, imageUrl]);
        editor?.chain().focus().setImage({ src: imageUrl }).run();

        setIsContentSaved(false);
      }
    };
    input.click();
  }, [editor]);

  const setLink = useCallback(() => {
    if (!linkUrl) return;
    editor?.chain().focus().setLink({ href: linkUrl }).run();
    setLinkUrl("");
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="border rounded-lg overflow-hidden w-full">
        <TextEditorMenuBar
          editor={editor}
          addImage={addImage}
          showLinkInput={showLinkInput}
          setShowLinkInput={setShowLinkInput}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          setLink={setLink}
        />
        <EditorContent editor={editor} />
        <div className="border-t p-2 text-sm text-gray-500 flex justify-between">
          <h1>{savedStatus ? <Loader /> : "Saved"}</h1>
          <div>
            Words: {editorContent.wordCount} | Characters:{" "}
            {editorContent.characterCount}
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export { TextAreaEditor };
