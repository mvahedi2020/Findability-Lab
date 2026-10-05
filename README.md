# Findability Lab

[Open the live demo](https://mvahedi2020.github.io/Findability-Lab/) · [Public source](https://github.com/mvahedi2020/Findability-Lab) · [Release evidence](docs/product/Validation.md)

An original fictional Northstar asset library for explicit search intent, explainable metadata and controlled correction. Mo owns product/program direction; AI assists implementation and verification. No human study or commercial outcome is claimed.

Search the six original assets, apply visible facets, inspect why an asset matched, preview a controlled one-record tag correction, compare fixed query labels, and recover from empty results. Search is exact lexical matching; the only optional synonym is bike → bike/bicycle. All data/artwork is fictional and authored for this prototype. No live AI, auth, analytics or external requests.

## Product and evidence

- [Product brief](docs/product/Product_Brief.md)
- [Requirements and S043–S052 mapping](docs/product/PRD.md)
- [Exact fictional sample, rules and calculations](docs/product/Sample_Contract.md)
- [Case study](docs/product/Case_Study.md)
- [Decisions and risks](docs/product/Decisions_and_Risks.md)
- [Software evidence, proposed human evaluation and release status](docs/product/Validation.md)
- [Exact walkthrough](docs/product/Sample_Walkthrough.md)

## Reproduce locally
Use Node24 (`nvm use` if available), then:

```sh
npm ci
npm run lint
npm run typecheck
npm run test
npm run audit
npm run build
npx playwright install chromium
npm run test:e2e
npm run preview
```

Open http://127.0.0.1:4190/Findability-Lab/. Only port4190 is used. Production base is `/Findability-Lab/`; product docs are copied into the production build. Storage key is `northstar-findability-v1`. Query/facet/scope changes are session-only and have one prior-view restoration; compatible refresh preserves confirmed tags/policy/history. Invalid storage is preserved until reviewed reset. Storage failures keep memory with warning. Undo reverses only the latest edit; reset has no Undo.

The main tradeoff is transparency versus terminology coverage: an editor can explain exact fields and make a scoped correction, while whole-token matching still misses spelling variations and the wheel detail remains a false positive for full-scene intent. Fixed relevance labels are author judgment, not user research; no human evaluation has been conducted.

Read the [product documents](https://mvahedi2020.github.io/Findability-Lab/docs/index.html) in the styled reading guide. Canonical Markdown remains in `docs/`.
