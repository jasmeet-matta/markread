# Markread

A clean, modern, and minimal Markdown viewer and editor built with React and Vite. Markread is designed for focused reading and writing with a variety of themes and typography options.

## Features

- **Live Preview**: Seamlessly toggle between Markdown editing and rendered HTML preview.
- **Theming**: Includes 6 beautiful themes (Paper, Snow, Sepia, Midnight, Carbon, Dim) with automatic system dark mode detection.
- **Typography**: Support for Serif, Sans, and Mono fonts with adjustable font sizes.
- **Markdown Support**: Built-in Markdown parser supporting:
  - Headers, bold, italics, strikethrough.
  - Blockquotes and nested quotes.
  - Ordered and unordered lists.
  - Task lists (checkboxes).
  - Fenced code blocks.
  - Tables with alignment.
  - Horizontal rules.
- **One-Click Actions**: Quickly copy your Markdown to the clipboard or clear the editor.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/markread.git
   cd markread
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Build

Build the project for production:
```bash
npm run build
```

## Project Structure

```
markread/
├── src/
│   ├── components/    # Reusable UI components (Header, Editor, Preview, etc.)
│   ├── lib/           # Core logic (Markdown parser, styling helpers)
│   ├── styles/        # CSS files
│   ├── App.tsx        # Main application entry and state management
│   ├── constants.ts   # Theme, font, and starter text definitions
│   └── main.tsx       # Vite entry point
├── public/            # Static assets
└── vite.config.ts     # Vite configuration
```

## Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Standard CSS with CSS Variables for theming.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
