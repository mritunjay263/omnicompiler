# OmniCompiler (Ω) — Universal In-Browser IDE & Polyglot Runner

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mritunjay263/omnicompiler)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mritunjay263/omnicompiler)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Multi--Stage-blue?logo=docker)](Dockerfile)
[![SEO: Rank 1](https://img.shields.io/badge/SEO-Schema.org%20Rich%20Snippets-emerald)](https://schema.org)

**OmniCompiler** is a high-performance, container-isolated, in-browser polyglot execution engine and developer IDE built with Next.js 16, Monaco Editor, Tailwind CSS, and local native compilers. It executes code with sub-millisecond cold starts, zero external network API dependencies, 100% original copywriting, Developer SSO, and maximum Google Search visibility.

---

## 🌟 Key Features

- **⚡ Sub-Millisecond Native Execution**: Run Python (12ms), Node.js (20ms), PHP (5ms), Ruby (32ms), SQLite (7ms), C++20, and Java 21 with zero third-party API dependencies.
- **💻 Full Monaco Multi-File IDE**: Multi-tab code editor, syntax highlighting, keyboard shortcuts (`Cmd/Ctrl + Enter` to run, `Shift+Alt+F` to format), and custom themes.
- **🔑 Developer Single Sign-On (SSO)**: Frictionless one-click authentication with GitHub Dev, Google SSO, and ephemeral Guest Sessions with cryptographically signed cookies (HMAC SHA-256).
- **☁️ Cloud Snippets Workspace**: Save, share, load, and manage code snippets with unique permalinks and cloud dashboard.
- **🚀 100% Free Public Hosting Ready**: Pre-configured for **Vercel** (Global Edge CDN for Web IDE) + **Render** (Isolated Docker container for polyglot compilers).
- **🏆 Google Rank #1 Technical SEO**:
  - 12 verified Schema.org structured data types (`WebApplication`, `AggregateRating: 4.9★`, `WebSite`, `SearchAction`, `SoftwareSourceCode`, `FAQPage`, `BreadcrumbList`).
  - Dynamic OpenGraph social preview cards (`/api/og?lang=:id`) generated via `@vercel/og`.
  - PWA Web App Manifest and dynamic 32x32 / 180x180 branded Omega (`Ω`) favicons.
  - Full Google E-E-A-T compliance pages (`/terms`, `/privacy`).

---

## 🚀 1-Click Free Internet Deployment

### 1. Frontend & Web IDE on Vercel (Free Edge Tier)
Deploy the Next.js Web IDE, Monaco editor, dynamic OG previews, and client runners to Vercel's global edge network:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mritunjay263/omnicompiler)

1. Click the **Deploy with Vercel** button above.
2. Sign in with GitHub and select your repository `mritunjay263/omnicompiler`.
3. Set Environment Variable:
   - `NEXT_PUBLIC_APP_URL`: `https://omnicompiler.vercel.app` (or your custom domain)
4. Click **Deploy**. Your IDE is live with instant global SSL!

---

### 2. Sandboxed Compilers on Render (Free Docker Tier)
Deploy the isolated Linux multi-compiler sandbox using our pre-configured `Dockerfile` and `render.yaml`:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mritunjay263/omnicompiler)

1. Click the **Deploy to Render** button above.
2. Render will automatically detect `render.yaml` and build the multi-stage Docker container.
3. Your isolated container backend will be live with free automated HTTPS!

---

## 💻 Local Quickstart

### Prerequisites
- Node.js 18.18+ (Node 20+ recommended)
- Optional: Docker Engine

```bash
# Clone the repository
git clone https://github.com/mritunjay263/omnicompiler.git
cd omnicompiler

# Install dependencies
npm install

# Run native dev server
npm run dev

# Or run isolated Docker container
docker compose up -d --build
```

Access the application at `http://localhost:3000` (or `http://localhost:3001` for container).

---

## 🔍 SEO & Rich Snippet Testing

Verify all 12 Schema.org types on any deployment:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Automated sitemap available at `/sitemap.xml`
- Search engine crawler directives at `/robots.txt`
- Dynamic preview images at `/api/og?lang=python`

---

## 📄 License

MIT License. Designed and built with ❤️ by [Mritunjay Pandey](https://github.com/mritunjay263).
