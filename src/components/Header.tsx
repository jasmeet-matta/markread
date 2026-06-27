import React from "react";
import { THEMES, FONTS } from "../constants";
import { getCtrlBaseStyle } from "../lib/styles";

interface HeaderProps {
  mode: string;
  setMode: (mode: string) => void;
  themeKey: string;
  setThemeKey: (key: string) => void;
  fontKey: string;
  setFontKey: (key: string) => void;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  t: any;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  themeKey,
  setThemeKey,
  fontKey,
  setFontKey,
  size,
  setSize,
  t,
}) => {
  const ctrlBase = getCtrlBaseStyle(t);

  const segWrap: React.CSSProperties = {
    display: "inline-flex",
    border: `1px solid ${t.border}`,
    borderRadius: "8px",
    overflow: "hidden",
  };

  const segBtn = (active: boolean): React.CSSProperties => ({
    background: active ? t.link : "transparent",
    color: active ? (t.mode === "dark" ? t.bg : "#fff") : t.muted,
    border: "none",
    padding: "6px 16px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: active ? 600 : 400,
    transition: "background 0.12s, color 0.12s",
  });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "10px",
        padding: "10px 16px",
        background: t.surface,
        borderBottom: `1px solid ${t.border}`,
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: "14px", marginRight: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
        Markread
      </div>

      <div style={segWrap}>
        <button style={segBtn(mode === "edit")} onClick={() => setMode("edit")}>Edit</button>
        <button style={segBtn(mode === "preview")} onClick={() => setMode("preview")}>Preview</button>
      </div>

      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{ ...ctrlBase, background: t.surface }}
        title="Theme"
      >
        <optgroup label="Light">
          {Object.entries(THEMES)
            .filter(([, v]) => v.mode === "light")
            .map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
        </optgroup>
        <optgroup label="Dark">
          {Object.entries(THEMES)
            .filter(([, v]) => v.mode === "dark")
            .map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
        </optgroup>
      </select>

      <select
        value={fontKey}
        onChange={(e) => setFontKey(e.target.value)}
        style={{ ...ctrlBase, background: t.surface }}
        title="Reading font"
      >
        {Object.entries(FONTS).map(([k, v]) => (
          <option key={k} value={k}>{v.label}</option>
        ))}
      </select>

      <div style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${t.border}`, borderRadius: "7px", overflow: "hidden" }}>
        <button
          style={{ ...ctrlBase, border: "none", borderRadius: 0, padding: "5px 10px" }}
          onClick={() => setSize((s) => Math.max(14, s - 1))}
          title="Smaller text"
        >
          A−
        </button>
        <span style={{ color: t.muted, fontSize: "12px", minWidth: "30px", textAlign: "center" }}>{size}</span>
        <button
          style={{ ...ctrlBase, border: "none", borderRadius: 0, padding: "5px 10px" }}
          onClick={() => setSize((s) => Math.min(26, s + 1))}
          title="Larger text"
        >
          A+
        </button>
      </div>
    </div>
  );
};
