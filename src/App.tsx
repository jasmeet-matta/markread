import { useState, useEffect, useMemo, useRef } from "react";
import { THEMES, FONTS, MONO, STARTER } from "./constants";
import { markdownToHtml } from "./lib/markdown";
import { Header } from "./components/Header";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { StatusBar } from "./components/StatusBar";
import "./styles/markdown.css";

export default function App() {
  const initialTheme =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "carbon"
      : "sepia";

  const [text, setText] = useState(STARTER);
  const [themeKey, setThemeKey] = useState(initialTheme);
  const [mode, setMode] = useState("preview");
  const [fontKey, setFontKey] = useState("serif");
  const [size, setSize] = useState(18);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  const t = (THEMES as any)[themeKey];

  // Load Spectral font
  useEffect(() => {
    const id = "spectral-font-link";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  const rendered = useMemo(() => markdownToHtml(text), [text]);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  const copy = async () => {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.left = "0";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(ta);
      return ok;
    };

    let done = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        done = true;
      }
    } catch (e) {
      done = false;
    }

    if (!done) done = fallback();
    if (done) {
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    }
  };

  const clear = () => setText("");

  const rootVars = {
    "--bg": t.bg,
    "--surface": t.surface,
    "--text": t.text,
    "--muted": t.muted,
    "--border": t.border,
    "--code-bg": t.codeBg,
    "--link": t.link,
    "--read-font": (FONTS as any)[fontKey].stack,
    "--read-size": size + "px",
    "--mono-font": MONO,
  };

  const chrome: React.CSSProperties = {
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    fontSize: "13px",
    color: t.text,
    colorScheme: t.mode as any,
  };

  return (
    <div
      style={{
        ...rootVars,
        ...chrome,
        background: t.bg,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.25s, color 0.25s",
      } as React.CSSProperties}
    >
      <Header
        mode={mode}
        setMode={setMode}
        themeKey={themeKey}
        setThemeKey={setThemeKey}
        fontKey={fontKey}
        setFontKey={setFontKey}
        size={size}
        setSize={setSize}
        t={t}
      />

      <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        {mode === "edit" ? (
          <Editor text={text} setText={setText} t={t} />
        ) : (
          <Preview rendered={rendered} />
        )}
      </div>

      <StatusBar
        words={words}
        chars={chars}
        copy={copy}
        clear={clear}
        copied={copied}
        t={t}
      />
    </div>
  );
}
