import React from "react";
import { getCtrlBaseStyle } from "../lib/styles";

interface StatusBarProps {
  words: number;
  chars: number;
  copy: () => void;
  clear: () => void;
  copied: boolean;
  t: any;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  words,
  chars,
  copy,
  clear,
  copied,
  t,
}) => {
  const ctrlBase = getCtrlBaseStyle(t);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "8px 16px",
        background: t.surface,
        borderTop: `1px solid ${t.border}`,
        color: t.muted,
        fontSize: "12px",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <span>{words.toLocaleString()} words</span>
      <span>{chars.toLocaleString()} characters</span>
      <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
        <button style={ctrlBase} onClick={copy}>
          {copied ? "Copied!" : "Copy"}
        </button>
        <button style={ctrlBase} onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
};
