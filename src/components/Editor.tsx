import React from "react";
import { MONO } from "../constants";

interface EditorProps {
  text: string;
  setText: (text: string) => void;
  t: any;
}

export const Editor: React.FC<EditorProps> = ({ text, setText, t }) => {
  return (
    <textarea
      className="mdv-editor mdv-scroll"
      value={text}
      onChange={(e) => setText(e.target.value)}
      spellCheck={false}
      placeholder="Write or paste Markdown here…"
      style={{
        flex: 1,
        width: "100%",
        resize: "none",
        border: "none",
        background: t.bg,
        color: t.text,
        fontFamily: MONO,
        fontSize: "14px",
        lineHeight: 1.7,
        padding: "24px max(24px, calc((100% - 820px) / 2))",
        boxSizing: "border-box",
        transition: "background 0.25s, color 0.25s",
      }}
    />
  );
};
