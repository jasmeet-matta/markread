# ✍️ Markread

A clean, modern, and minimal Markdown viewer and editor that's actually easy on the eyes. Built with React and Vite, Markread is your go-to spot for focused writing and distraction-free reading. No clutter, just you and your words. 🚀

## ✨ Cool Stuff it Does

- **🌗 Live Preview**: Watch your Markdown turn into pretty HTML instantly. Toggle back and forth like a pro.
- **🎨 Vibes (Themes)**: Comes with 6 gorgeous themes (Paper, Snow, Sepia, Midnight, Carbon, Dim). It even respects your system's dark mode!
- **📖 Typography**: Choose between Serif, Sans, or Mono fonts and tweak the size until it feels just right.
- **📝 Markdown Magic**: Full support for all the essentials:
  - Headers, **bold**, *italics*, ~~strikethrough~~.
  - Blockquotes (even the nested ones).
  - Ordered, unordered, and task lists (✅).
  - Fenced code blocks for the devs.
  - Tables with alignment.
  - Horizontal rules to keep things organized.
- **⚡ Quick Actions**: One-click to copy your Markdown or clear the slate.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` (comes with Node)

### Installation

1. Grab the code:
   ```bash
   git clone https://github.com/jasmeet-matta/markread.git
   cd markread
   ```

2. Install the goodies:
   ```bash
   npm install
   ```

### Running Locally

Fire up the development server:
```bash
npm run dev
```

### Building for Production

Make it go fast:
```bash
npm run build
```

## 📂 What's Inside?

```
markread/
├── src/
│   ├── components/    # Reusable UI bits (Header, Editor, Preview, etc.)
│   ├── lib/           # The brains (Markdown parser, styling helpers)
│   ├── styles/        # CSS magic
│   ├── App.tsx        # The main conductor
│   ├── constants.ts   # Themes, fonts, and that cool starter text
│   └── main.tsx       # Entry point
├── public/            # Static stuff (like the favicon)
└── vite.config.ts     # Vite config
```

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (The UI engine)
- **Build Tool**: [Vite](https://vitejs.dev/) (The speed demon)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (For that sweet type safety)
- **Styling**: Standard CSS with CSS Variables (Keepin' it simple)

## 📜 License

This project is licensed under the MIT License - check the [LICENSE](LICENSE) file for the legal bits. 📄
