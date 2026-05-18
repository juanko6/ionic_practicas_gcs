<div align="center">

```
   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║      ░██████╗████████╗░█████╗░██████╗░░██╗░░░░░░░██╗      ║
   ║      ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗░██║░░██╗░░██║      ║
   ║      ╚█████╗░░░░██║░░░███████║██████╔╝░╚██╗████╗██╔╝      ║
   ║      ░╚═══██╗░░░██║░░░██╔══██║██╔══██╗░░████╔═████║░      ║
   ║      ██████╔╝░░░██║░░░██║░░██║██║░░██║░░╚██╔╝░╚██╔╝░      ║
   ║      ╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░      ║
   ║                                                           ║
   ║              W   I   K   I   ·   G   C   S               ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
```

# Wiki Star Wars — *a hybrid galactic codex*

**Mobile-first hybrid app that turns the SWAPI universe into a fast, reactive, persistent encyclopedia.**

[![Ionic](https://img.shields.io/badge/Ionic-8-3880FF?style=flat-square&logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.io/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?style=flat-square&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SWAPI](https://img.shields.io/badge/SWAPI-v2-FFE81F?style=flat-square&logoColor=black)](https://swapi.tech/)
[![Status](https://img.shields.io/badge/status-active%20development-22c55e?style=flat-square)](#)

</div>

---

## ✦ Mission

> Build a portable, offline-friendly Star Wars encyclopedia that loads in milliseconds, looks native on every device, and proves that modern hybrid stacks (Ionic + Angular + Capacitor) can match raw-native UX without the platform tax.

A teaching playground for the *Gestión de la Calidad del Software* course at the **Universidad de Alicante**, evolved iteratively across four workshops into a production-quality reference app.

---

## ⚡ Core capabilities

| | Capability | What you get |
|---|---|---|
| 🌌 | **Galactic catalog** | Browse `People`, `Planets`, `Species`, `Starships` straight from [SWAPI v2](https://swapi.tech/). |
| 🔭 | **Article detail** | Strongly-typed, switch-rendered cards for every SWAPI resource (`/tabs/wiki/article/:cat/:id`). |
| 🔐 | **Reactive forms** | Login, Register and Profile flows powered by Angular's `ReactiveFormsModule` — with custom validators, `FormArray`, cross-field checks and live debug panels. |
| 📑 | **Tabbed shell** | Bottom-tab navigation (`Wiki · Favorites · Login · Register · Profile · About · Exit`) with lazy-loaded modules. |
| 🧩 | **Data-driven UI** | Categories and (incoming) side-menu entries are described in JSON and rendered dynamically. |
| 📱 | **Cross-platform** | One codebase deploys to web (PWA), iOS and Android via Capacitor. |

---

## 🛰️ Architecture at a glance

```
┌────────────────────────────────────────────────────────────────────┐
│                         Wiki StarWars App                          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│   ┌──────────┐    ┌────────────────┐    ┌────────────────────┐    │
│   │  Pages   │ →  │   Components   │ ←  │  Reactive  Forms   │    │
│   │  (lazy)  │    │ (presentational)│    │ (Login/Register/  │    │
│   └────┬─────┘    └────────┬───────┘    │      Profile)      │    │
│        │                   │            └────────────────────┘    │
│        ▼                   ▼                                      │
│   ┌──────────────────────────────┐                                │
│   │       Services layer         │                                │
│   │  • WikiService  (HttpClient) │  ──► swapi.tech / api / *      │
│   │  • StorageService            │  ──► IndexedDB / SQLite        │
│   └──────────────────────────────┘                                │
│                                                                    │
│                        Models  ·  Validators                      │
│   ( Category · People · Planet · Species · Starship · Article )   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

- **Lazy modules** keep the initial bundle tiny.
- **Service singletons** isolate every external boundary (network + storage).
- **Standalone-false components** registered through feature modules — predictable DI, no surprises.

---

## 🧱 Tech stack

| Layer | Tooling |
|---|---|
| **UI kit** | Ionic 8 + Ionicons 7 |
| **Framework** | Angular 20 (modules + lazy routing) |
| **Native bridge** | Capacitor 8 (App, Haptics, Keyboard, Status Bar) |
| **Forms** | `ReactiveFormsModule` + custom validators (`forbiddenName`, `matchFields`) |
| **HTTP** | Angular `HttpClient` → SWAPI v2 |
| **Persistence** | `@ionic/storage-angular` (IndexedDB on web, SQLite on native) |
| **Language** | TypeScript 5.9, strict mode, JSDoc on public APIs |
| **Build** | `@angular-devkit/build-angular`, Webpack |
| **Lint** | ESLint 9 + `@angular-eslint` + `@typescript-eslint` |
| **Test** | Karma + Jasmine |

---

## 🚀 Quick start

> All commands assume you are inside the `appIonic/` directory unless stated otherwise.

### Prerequisites

| Tool | Minimum version | Check with |
|---|---|---|
| Node.js | **20.x** (LTS, 22 recommended) | `node --version` |
| npm | **10.x** | `npm --version` |
| Ionic CLI | **7.x** | `ionic --version` |

Install the Ionic CLI globally if you don't have it yet:

```bash
npm install -g @ionic/cli
```

### 1 — Clone

```bash
git clone https://github.com/juanko6/ionic_practicas_gcs.git
cd ionic_practicas_gcs/appIonic
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Run the dev server

```bash
ionic serve
# or, if you prefer the raw Angular CLI:
npm start
```

The app opens automatically at **http://localhost:8100** with hot reload.

### 4 — Production build

```bash
ionic build
# Output: www/  (ready to be served by any static host)
```

### 5 — Deploy to native targets *(optional)*

```bash
# iOS
ionic capacitor add ios
ionic capacitor run ios

# Android
ionic capacitor add android
ionic capacitor run android
```

> 💡 You need Xcode (iOS) or Android Studio (Android) installed locally. Capacitor handles everything else.

### 6 — Docker workflow *(optional)*

If your team standardises on containers, you can run the whole toolchain via Docker Compose:

```bash
docker compose run --rm taller_ionic "ionic serve --external"
docker compose run --rm taller_ionic "npm install <package>"
docker compose run --rm taller_ionic "ionic g page <name>"
```

---

## 🧭 Project map

```
ionic_practicas_gcs/
├── appIonic/                          # Ionic + Angular workspace
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/                 # Static "About" page
│   │   │   ├── article/               # Detail view for a SWAPI resource
│   │   │   ├── category/              # Reusable category card component
│   │   │   ├── exit/                  # Exit confirmation page
│   │   │   ├── favorites/             # Saved articles list
│   │   │   ├── login/                 # Reactive Form: email + password
│   │   │   ├── profile/               # Reactive Form: setValue / patchValue demo
│   │   │   ├── register/              # Reactive Form with FormArray + custom validators
│   │   │   ├── tabs/                  # Tab shell + bottom navigation
│   │   │   ├── wiki/                  # Categories landing + child article route
│   │   │   ├── models/                # Category · People · Planet · Species · Starship
│   │   │   ├── services/              # WikiService · StorageService
│   │   │   └── validators/            # forbiddenName · matchFields
│   │   └── assets/
│   │       ├── data/categories.json   # Mockup catalog (offline-first)
│   │       └── images/categories/     # Avatars for each category
│   ├── angular.json
│   ├── capacitor.config.ts
│   ├── ionic.config.json
│   └── package.json
├── AGENTS.md                          # Agent-oriented contribution notes
├── CLAUDE.md                          # GitNexus / Claude integration guide
└── README.md                          # ← you are here
```

---

## 🧪 Available scripts

| Command | Description |
|---|---|
| `npm start` / `ionic serve` | Dev server with HMR at `http://localhost:8100` |
| `npm run build` / `ionic build` | Production build → `www/` |
| `npm run watch` | Continuous dev build (no server) |
| `npm test` | Karma + Jasmine unit tests |
| `npm run lint` | ESLint across the workspace |

---

## 🗺️ Roadmap

The project is delivered in four iterative workshops. Each phase ships as its own pull request and lands on `main` after review.

- [x] **Phase 1** — Tabbed shell, About / Exit pages, base routing
- [x] **Phase 2** — `WikiService` + `CategoryComponent` + SWAPI integration ([#2](https://github.com/juanko6/ionic_practicas_gcs/pull/2))
- [x] **Phase 3** — Reactive Forms (Login / Register / Profile) + dynamic article routing ([#3](https://github.com/juanko6/ionic_practicas_gcs/pull/3))
- [ ] **Phase 4** — Ionic Storage, dynamic side menu, persistent favorites *(in review — [#4](https://github.com/juanko6/ionic_practicas_gcs/pull/4))*

---

## 🤝 Contributing

This is a coursework repository, but PRs are welcome from anyone reproducing the workshop. The flow we follow:

1. Fork or branch from `main`.
2. Use **semantic commit messages** (`feat:`, `fix:`, `chore:`, `merge:`, …).
3. Make sure `ng build` passes and Chrome smoke-tests are green.
4. Open a PR against `main` — include a summary, test plan and screenshots if UI changes.

> 🛰️ The repo is indexed by **GitNexus** — read [`CLAUDE.md`](./CLAUDE.md) before refactoring to run blast-radius analysis on the symbols you touch.

---

## 👥 Authors

- **Juan Carlos** ([@juanko6](https://github.com/juanko6)) — Project owner, architecture
- **Naoufal Charafat** ([@Naoufal-Charafat](https://github.com/Naoufal-Charafat)) — Co-developer

---

## 📜 License & credits

Educational project for the **Gestión de la Calidad del Software** course, *Grado en Ingeniería Informática*, **Universidad de Alicante** — academic year 2025-2026.

Star Wars data courtesy of [SWAPI](https://swapi.tech/). All trademarks belong to their respective owners.

<div align="center">

— Built with `<3` somewhere between Tatooine and Alicante —

</div>
