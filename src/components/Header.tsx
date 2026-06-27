import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    padding: isMobile ? "6px 12px" : "6px 16px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: active ? 600 : 400,
    transition: "background 0.12s, color 0.12s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const menuStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: "16px",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 100,
    minWidth: "180px",
  };

  const menuLabelStyle: React.CSSProperties = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: t.muted,
    marginBottom: "4px",
    display: "block",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: "10px",
        padding: "10px 16px",
        background: t.surface,
        borderBottom: `1px solid ${t.border}`,
        transition: "background 0.25s, border-color 0.25s",
        position: "relative",
      }}
    >
      <div style={{ 
        fontWeight: 600, 
        fontSize: "14px", 
        marginRight: "auto", 
        display: "flex", 
        alignItems: "center", 
        gap: "8px",
        flexShrink: 0 
      }}>
        Markread
      </div>

      <div style={{ ...segWrap, flexShrink: 0 }}>
        <button style={segBtn(mode === "edit")} onClick={() => setMode("edit")} title="Edit">
          Edit
        </button>
        <button style={segBtn(mode === "preview")} onClick={() => setMode("preview")} title="Preview">
          Preview
        </button>
      </div>

      {!isMobile ? (
        <>
          <select
            value={themeKey}
            onChange={(e) => setThemeKey(e.target.value)}
            style={{ ...ctrlBase, background: t.surface, flexShrink: 0 }}
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
            style={{ ...ctrlBase, background: t.surface, flexShrink: 0 }}
            title="Reading font"
          >
            {Object.entries(FONTS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>

          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            border: `1px solid ${t.border}`, 
            borderRadius: "7px", 
            overflow: "hidden",
            flexShrink: 0
          }}>
            <button
              style={{ ...ctrlBase, border: "none", borderRadius: 0 }}
              onClick={() => setSize((s) => Math.max(14, s - 1))}
              title="Smaller text"
            >
              A−
            </button>
            <span style={{ 
              color: t.muted, 
              fontSize: "12px", 
              minWidth: "30px", 
              textAlign: "center",
              borderLeft: `1px solid ${t.border}`,
              borderRight: `1px solid ${t.border}`,
              padding: "0 4px"
            }}>
              {size}
            </span>
            <button
              style={{ ...ctrlBase, border: "none", borderRadius: 0 }}
              onClick={() => setSize((s) => Math.min(26, s + 1))}
              title="Larger text"
            >
              A+
            </button>
          </div>
        </>
      ) : (
        <>
          <button 
            style={{ ...ctrlBase, padding: "5px 8px" }} 
            onClick={() => setMenuOpen(!menuOpen)}
            title="Settings"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {menuOpen && (
            <div style={menuStyle}>
              <div>
                <span style={menuLabelStyle}>Theme</span>
                <select
                  value={themeKey}
                  onChange={(e) => setThemeKey(e.target.value)}
                  style={{ ...ctrlBase, width: "100%", background: t.surface }}
                >
                  <optgroup label="Light">
                    {Object.entries(THEMES).filter(([, v]) => v.mode === "light").map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Dark">
                    {Object.entries(THEMES).filter(([, v]) => v.mode === "dark").map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <span style={menuLabelStyle}>Font</span>
                <select
                  value={fontKey}
                  onChange={(e) => setFontKey(e.target.value)}
                  style={{ ...ctrlBase, width: "100%", background: t.surface }}
                >
                  {Object.entries(FONTS).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <span style={menuLabelStyle}>Size</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    style={{ ...ctrlBase, flex: 1 }}
                    onClick={() => setSize((s) => Math.max(14, s - 1))}
                  >
                    A−
                  </button>
                  <span style={{ color: t.muted, fontSize: "13px", minWidth: "20px", textAlign: "center" }}>
                    {size}
                  </span>
                  <button
                    style={{ ...ctrlBase, flex: 1 }}
                    onClick={() => setSize((s) => Math.min(26, s + 1))}
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
