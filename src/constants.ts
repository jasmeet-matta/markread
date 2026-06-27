export const THEMES = {
  paper:    { label: "Paper",    mode: "light", bg: "#faf8f4", surface: "#ffffff", text: "#1f1d1a", muted: "#6b655c", border: "#e6e0d6", codeBg: "#f1ede5", link: "#9a5b2e" },
  snow:     { label: "Snow",     mode: "light", bg: "#ffffff", surface: "#f7f8fa", text: "#1a1d21", muted: "#6a7280", border: "#e4e7eb", codeBg: "#f0f2f5", link: "#2563eb" },
  sepia:    { label: "Sepia",    mode: "light", bg: "#f4ecd8", surface: "#faf3e0", text: "#433422", muted: "#8a7253", border: "#e0d2b4", codeBg: "#ece0c4", link: "#8a5a2b" },
  midnight: { label: "Midnight", mode: "dark",  bg: "#11151c", surface: "#171c26", text: "#e6e9ef", muted: "#8b94a3", border: "#262d39", codeBg: "#1c222e", link: "#7aa2f7" },
  carbon:   { label: "Carbon",   mode: "dark",  bg: "#121212", surface: "#1c1c1c", text: "#e8e8e8", muted: "#8a8a8a", border: "#2a2a2a", codeBg: "#1e1e1e", link: "#9bb4ff" },
  dim:      { label: "Dim",      mode: "dark",  bg: "#1e232b", surface: "#262c36", text: "#dfe4ec", muted: "#939db0", border: "#353d4a", codeBg: "#2a313c", link: "#82aaff" },
};

export const FONTS = {
  serif: { label: "Serif", stack: "'Spectral', Georgia, 'Times New Roman', serif" },
  sans:  { label: "Sans",  stack: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" },
  mono:  { label: "Mono",  stack: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace" },
};

export const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";

export const STARTER = `# 🏍️ The Ride Guide to Markread

Welcome, rider! You've just pulled into **Markread**, the ultimate pit stop for your Markdown adventures. Whether you're documenting a cross-country road trip or tuning your engine's performance, we've got you covered.

## 🖋️ Biker's Formatting

Express yourself on the open road:
- **Lean hard** into every curve.
- Add some *chrome shine* to your logs.
- Combine them for ***full throttle impact***!
- Missed a turn? Just ~~strikethrough~~ it.
- Need to reference a \`fuel-injector\`? Use inline code.

Don't forget to check our [Pit Stop](https://www.jasmeetmatta.dev/) for more updates.

---

## 📜 Wisdom from the Open Road

> "Four wheels move the body. Two wheels move the soul."
>
> > "It's not what you ride, it's that you ride." — *Every Biker Ever*

---

## 🛠️ Garage & Saddlebags

### Saddlebag Essentials (Unordered)
- 🧴 Chain Lube
- 🧥 Leather Jacket
  - *Pro-tip: Keep it zipped up in the rain*
- 🛠️ Multi-Tool

### Starting Procedure (Ordered)
1. Kickstand up
2. Neutral gear check
3. Ignite the beast

### Pre-Ride Checklist (Tasks)
- [x] Tire pressure checked
- [x] Fuel tank topped up
- [ ] Helmet visor cleaned

---

## 💻 Smart Riding (Code)

Need to calculate your fuel range? Here's a snippet in **Rider Script**:

\`\`\`js
function checkFuel(level) {
  if (level < 0.2) {
    return "Time to find a gas station! ⛽";
  }
  return \`Tank is \${Math.round(level * 100)}% full. Keep riding! 🛣️\`;
}

console.log(checkFuel(0.15));
\`\`\`

---

## 📊 Bike Specs Comparison

| Model | Type | Engine | Cool Factor |
| :--- | :---: | ---: | :--- |
| **Cruiser** | Low & Slow | 1800cc | 😎 Very Chill |
| **Sportbike** | Fast | 1000cc | ⚡ High Voltage |
| **Cafe Racer** | Retro | 750cc | 🧥 Super Stylish |

---

### 🎨 Customize Your Ride

Toggle the **Themes** to change the vibe of your garage, or switch **Fonts** to find your favorite reading frequency. 

Happy riding, Road Warrior! 🏁
`;
