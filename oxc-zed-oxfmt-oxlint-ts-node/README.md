# node-ts-oxlint-oxfmt-zed boilerplate

A minimal, opinionated Node.js + TypeScript starter with fast tooling — no ESLint, no Prettier, no Webpack.

## Stack

| Tool                                                       | Role                                             |
| ---------------------------------------------------------- | ------------------------------------------------ |
| [TypeScript](https://www.typescriptlang.org/)              | Language — strict, ESM-first                     |
| [tsx](https://github.com/privatenumber/tsx)                | Dev runner & watch mode                          |
| [oxlint](https://oxc.rs/docs/guide/usage/linter)           | Linter — 50–100× faster than ESLint              |
| [oxlint-tsgolint](https://github.com/oxc-project/tsgolint) | Type-aware lint backend powered by typescript-go |
| [oxfmt](https://github.com/nicolo-ribaudo/oxfmt)           | Formatter — replaces Prettier                    |
| [Zed](https://zed.dev/)                                    | Editor config — format on save, lint on type     |

---

## Project Structure

```
.
├── src/                        # Your source code (entry: src/index.ts)
│   └── @types/                 # Custom type declarations (optional)
├── dist/                       # Compiled output (git-ignored)
├── .zed/
│   └── settings.json           # Zed editor — formatter + linter wiring
├── .oxlintrc.json              # oxlint config
├── .oxfmtrc.json               # oxfmt config
├── tsconfig.json               # TypeScript config
└── package.json
```

---

## Getting Started

```sh
# 1. Clone / copy this boilerplate
# 2. Install dependencies
npm install

# 3. Rename the project
#    Edit "name" in package.json

# 4. Start coding
npm run start:dev
```

---

## Scripts

| Script                    | What it does                                                       |
| ------------------------- | ------------------------------------------------------------------ |
| `npm run start:dev`       | Run `src/index.ts` with tsx in watch mode (`NODE_ENV=development`) |
| `npm run start:dev-prod`  | Same as above but with `NODE_ENV=production`                       |
| `npm run start:prod`      | Run compiled `dist/index.js`                                       |
| `npm run build`           | Clean `dist/` and compile with `tsc`                               |
| `npm run typecheck`       | Type-check without emitting                                        |
| `npm run typecheck:watch` | Type-check in watch mode                                           |
| `npm run fmt`             | Format all files with oxfmt                                        |
| `npm run fmt:check`       | Check formatting (CI-friendly, no writes)                          |
| `npm run lint`            | Lint with oxlint (type-aware)                                      |
| `npm run lint:fix`        | Lint and auto-fix safe issues                                      |

---

## TypeScript

- **Module system**: `NodeNext` — native ESM with `.js` extensions on imports
- **Target**: `ES2022` — aligned with Node 18+
- **Strict mode**: fully enabled, plus extra safety flags:
    - `noUncheckedIndexedAccess` — array/object access includes `undefined`
    - `exactOptionalPropertyTypes` — optional props can't be set to `undefined` explicitly
    - `noImplicitOverride` — subclasses must use the `override` keyword
    - `noPropertyAccessFromIndexSignature` — index-typed props require bracket notation
    - `verbatimModuleSyntax` — imports are kept exactly as written; use `import type` for type-only imports
- **Incremental builds**: `.tsbuildinfo` cached at project root

> Custom global types go in `src/@types/`. They are picked up automatically via `typeRoots`.

---

## Linting

oxlint is configured in `.oxlintrc.json` with type-aware rules enabled via `oxlint-tsgolint`.

**Enabled plugins**: `eslint`, `import`, `node`, `unicorn`, `typescript`, `oxc`

**Type-aware rules** (require semantic analysis):

| Rule                              | Why it matters                                        |
| --------------------------------- | ----------------------------------------------------- |
| `typescript/no-floating-promises` | Catches `async` calls where `await` was forgotten     |
| `typescript/no-misused-promises`  | Catches async functions passed where sync is expected |
| `typescript/await-thenable`       | Catches `await` on non-Promise values                 |
| `typescript/require-await`        | Catches `async` functions that never actually `await` |
| `typescript/return-await`         | Enforces `return await` inside `try/catch`            |

Add or tune rules in `.oxlintrc.json` under `"rules"`.

---

## Formatting

oxfmt is configured in `.oxfmtrc.json`:

- **Tab width**: 4 spaces
- **Import sorting**: enabled, with grouped ordering:
    1. Side-effect imports
    2. Built-ins
    3. Type imports
    4. External packages
    5. Internal / subpath
    6. Relative (parent → sibling → index)
    7. Style
    8. Unknown

---

## Zed Editor

`.zed/settings.json` configures the editor for this project:

- **oxfmt** formats on save for: TypeScript, JavaScript, TSX, JSON, JSONC, CSS, HTML, Markdown, YAML
- **oxlint** runs on type (`source.fixAll.oxc`) for TypeScript and JavaScript
- Prettier is explicitly disabled for all languages

No extensions need manual configuration — Zed auto-discovers `oxlint` and `oxfmt` from `node_modules`.

---

## Adding Custom Types

Place `.d.ts` files under `src/@types/`:

```
src/
└── @types/
    └── my-module.d.ts
```

TypeScript picks them up automatically via the `typeRoots` config. No import needed.

---

## Production Build

```sh
npm run build         # outputs to dist/
npm run start:prod    # runs dist/index.js with NODE_ENV=production
```

Source maps are emitted alongside the compiled output for accurate stack traces in production.

---

## License

ISC

