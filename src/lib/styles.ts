import React from "react";

export const getCtrlBaseStyle = (t: any): React.CSSProperties => ({
  background: "transparent",
  color: t.text,
  border: `1px solid ${t.border}`,
  borderRadius: "7px",
  padding: "5px 10px",
  fontSize: "13px",
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "background 0.12s, color 0.12s",
});
