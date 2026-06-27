/**
 * Utility to escape HTML special characters.
 */
export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Utility to escape attributes in HTML tags.
 */
export function escAttr(s: string): string {
  return esc(s).replace(/"/g, "&quot;");
}

/**
 * Handles inline emphasis like bold, italic, and strikethrough.
 */
function inlineEmphasis(t: string): string {
  t = t.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
  t = t.replace(/___([^_]+)___/g, "<strong><em>$1</em></strong>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>");
  t = t.replace(/(^|[^_])_([^_\s][^_]*?)_/g, "$1<em>$2</em>");
  t = t.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  return t;
}

/**
 * Parses inline markdown elements (links, images, code spans, etc.).
 */
export function inline(text: string): string {
  const store: string[] = [];
  const stash = (html: string) => {
    store.push(html);
    return `\u0000${store.length - 1}\u0000`;
  };

  // code spans
  text = text.replace(/`([^`]+)`/g, (_, c) => stash(`<code>${esc(c)}</code>`));

  // images
  text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, alt, url, title) =>
      stash(`<img src="${escAttr(url)}" alt="${escAttr(alt)}"${title ? ` title="${escAttr(title)}"` : ""} />`)
  );

  // links
  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, t, url, title) =>
      stash(`<a href="${escAttr(url)}" target="_blank" rel="noopener noreferrer"${title ? ` title="${escAttr(title)}"` : ""}>${inlineEmphasis(esc(t))}</a>`)
  );

  // angle autolinks
  text = text.replace(/<((?:https?:\/\/|mailto:)[^>\s]+)>/g, (_, url) =>
      stash(`<a href="${escAttr(url)}" target="_blank" rel="noopener noreferrer">${esc(url)}</a>`)
  );

  // bare url autolinks
  text = text.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (_, pre, url) =>
      pre + stash(`<a href="${escAttr(url)}" target="_blank" rel="noopener noreferrer">${esc(url)}</a>`)
  );

  // escape the rest, then emphasis
  text = esc(text);
  text = inlineEmphasis(text);

  // restore stashed html
  text = text.replace(/\u0000(\d+)\u0000/g, (_, i) => store[+i]);
  return text;
}

/**
 * Parses a paragraph, handling hard line breaks.
 */
function inlinePara(text: string): string {
  const lines = text.split("\n");
  let joined = "";
  lines.forEach((ln, idx) => {
    const hard = /(  +|\\)\s*$/.test(ln);
    joined += ln.replace(/(\s+|\\)\s*$/, "");
    if (idx < lines.length - 1) joined += hard ? "\u0001" : " ";
  });
  return inline(joined).replace(/\u0001/g, "<br />");
}

/**
 * Splits a table row by pipe characters.
 */
function splitRow(row: string): string[] {
  const r = row.trim().replace(/^\|/, "").replace(/\|$/, "");
  return r.split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, "|").trim());
}

/**
 * Checks if a line marks the beginning of a block element.
 */
function isBlockStart(line: string): boolean {
  return (
      /^(\s*)(```|~~~)/.test(line) ||
      /^#{1,6}\s/.test(line) ||
      /^\s*>/.test(line) ||
      /^\s*([-+*]|\d+[.)])\s+/.test(line) ||
      /^\s*([-*_])(\s*\1){2,}\s*$/.test(line)
  );
}

/**
 * Parses markdown lists (ordered, unordered, task lists).
 */
function parseList(lines: string[], start: number): [string, number] {
  const first = lines[start].match(/^(\s*)([-+*]|\d+[.)])\s+/)!;
  const baseIndent = first[1].length;
  const ordered = /\d/.test(first[2]);
  let i = start;
  const items: any[] = [];

  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) {
      const nxt = lines[i + 1] || "";
      const nInd = (nxt.match(/^(\s*)/) || ["", ""])[1].length;
      const nItem = /^\s*([-+*]|\d+[.)])\s+/.test(nxt);
      if (nxt && (nInd > baseIndent || (nItem && nInd === baseIndent))) {
        i++;
        continue;
      }
      break;
    }
    const m = line.match(/^(\s*)([-+*]|\d+[.)])\s+(.*)$/);
    if (!m || m[1].length !== baseIndent) break;

    let content = m[3];
    let task: boolean | null = null;
    const tm = content.match(/^\[([ xX])\]\s+(.*)$/);
    if (tm) {
      task = tm[1].toLowerCase() === "x";
      content = tm[2];
    }
    const sub: string[] = [];
    i++;
    while (i < lines.length) {
      if (/^\s*$/.test(lines[i])) {
        const nxt = lines[i + 1] || "";
        const nInd = (nxt.match(/^(\s*)/) || ["", ""])[1].length;
        const nItem = /^\s*([-+*]|\d+[.)])\s+/.test(nxt);
        if (nxt && nInd > baseIndent && !(nItem && nInd === baseIndent)) {
          sub.push("");
          i++;
          continue;
        }
        break;
      }
      const ind = (lines[i].match(/^(\s*)/) || ["", ""])[1].length;
      const isItem = /^\s*([-+*]|\d+[.)])\s+/.test(lines[i]);
      if (isItem && ind === baseIndent) break;
      if (ind > baseIndent) {
        sub.push(lines[i].slice(baseIndent));
        i++;
      } else break;
    }
    items.push({ content, task, sub });
  }

  const tag = ordered ? "ol" : "ul";
  const isTaskList = items.some((it) => it.task !== null);
  let out = `<${tag}${isTaskList ? ' class="task-list"' : ""}>`;
  items.forEach((it) => {
    let extra = "";
    let subHtml = "";
    if (it.sub.length) {
      const subText = it.sub.join("\n").replace(/^\n+|\n+$/g, "");
      if (subText) {
        const hasBlock = it.sub.some((l: string) => isBlockStart(l));
        if (hasBlock) subHtml = markdownToHtml(subText);
        else extra = " " + inline(subText.replace(/\n/g, " "));
      }
    }
    const body = inline(it.content) + extra + subHtml;
    if (it.task !== null) {
      out += `<li class="task-item"><input type="checkbox" disabled${it.task ? " checked" : ""} />${body}</li>`;
    } else {
      out += `<li>${body}</li>`;
    }
  });
  out += `</${tag}>`;
  return [out, i];
}

/**
 * Main function to convert Markdown text to HTML.
 */
export function markdownToHtml(md: string): string {
  md = md.replace(/\r\n?/g, "\n");
  const lines = md.split("\n");
  let html = "";
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }

    // fenced code
    const fence = line.match(/^(\s*)(```|~~~)\s*([\w+#-]*)\s*$/);
    if (fence) {
      const marker = fence[2];
      const lang = fence[3];
      i++;
      const buf = [];
      while (i < lines.length && !new RegExp("^\\s*" + marker + "\\s*$").test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      const langLabel = lang ? `<div class="code-lang">${esc(lang)}</div>` : "";
      html += `<div class="code-wrap">${langLabel}<pre><code>${esc(buf.join("\n"))}</code></pre></div>`;
      continue;
    }

    // heading
    const h = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (h) {
      const lvl = h[1].length;
      html += `<h${lvl}>${inline(h[2])}</h${lvl}>`;
      i++;
      continue;
    }

    // horizontal rule
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      html += "<hr />";
      i++;
      continue;
    }

    // blockquote
    if (/^\s*>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      html += `<blockquote>${markdownToHtml(buf.join("\n"))}</blockquote>`;
      continue;
    }

    // table
    if (
        line.includes("|") &&
        i + 1 < lines.length &&
        /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) &&
        lines[i + 1].includes("-")
    ) {
      const header = splitRow(line);
      const aligns = splitRow(lines[i + 1]).map((c) => {
        const l = c.startsWith(":");
        const r = c.endsWith(":");
        return l && r ? "center" : r ? "right" : l ? "left" : "";
      });
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && !/^\s*$/.test(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      let t = "<table><thead><tr>";
      header.forEach((c, idx) => {
        t += `<th${aligns[idx] ? ` style="text-align:${aligns[idx]}"` : ""}>${inline(c)}</th>`;
      });
      t += "</tr></thead><tbody>";
      rows.forEach((row) => {
        t += "<tr>";
        header.forEach((_, idx) => {
          t += `<td${aligns[idx] ? ` style="text-align:${aligns[idx]}"` : ""}>${inline(row[idx] || "")}</td>`;
        });
        t += "</tr>";
      });
      t += "</tbody></table>";
      html += t;
      continue;
    }

    // list
    if (/^\s*([-+*]|\d+[.)])\s+/.test(line)) {
      const [listHtml, ni] = parseList(lines, i);
      html += listHtml;
      i = ni;
      continue;
    }

    // indented code block
    if (/^ {4}\S/.test(line)) {
      const buf = [];
      while (i < lines.length && (/^ {4}/.test(lines[i]) || /^\s*$/.test(lines[i]))) {
        if (/^\s*$/.test(lines[i]) && !(i + 1 < lines.length && /^ {4}/.test(lines[i + 1]))) break;
        buf.push(lines[i].replace(/^ {4}/, ""));
        i++;
      }
      html += `<div class="code-wrap"><pre><code>${esc(buf.join("\n"))}</code></pre></div>`;
      continue;
    }

    // paragraph
    const buf = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !isBlockStart(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    html += `<p>${inlinePara(buf.join("\n"))}</p>`;
  }

  return html;
}
