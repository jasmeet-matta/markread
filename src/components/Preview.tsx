import React from "react";

interface PreviewProps {
  rendered: string;
}

export const Preview: React.FC<PreviewProps> = ({ rendered }) => {
  return (
    <div className="mdv-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 24px 64px" }}>
      <div
        className="md-body"
        style={{ maxWidth: "720px", margin: "0 auto" }}
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </div>
  );
};
