import { ReactNodeViewRenderer } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import { ImageComponent } from "./ImageComponent";

export const CustomImage = Image.extend({
  name: "customImage",
  inline: true,
  group: "inline",
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: "auto",
      },
      height: {
        default: "auto",
      },
      class: {
        default: null,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});
