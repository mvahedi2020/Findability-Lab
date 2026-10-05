# Case study: make an omission inspectable

## User and decision

A fictional collection editor knows the intended bicycle scene, yet the asset title Morning commuter and intake tags commute/urban do not match bicycle. The product choice is to show the lexical rules and original evidence beside a controlled one-record correction. A search-first library with a compact metadata drawer keeps the explicit intent visible.

## Prioritization and tradeoff

The rejected alternative was semantic ranking. It might improve vocabulary coverage, but a deterministic static sample cannot substantiate that benefit. Another alternative, silently adding inferred tags across the library, would obscure evidence and scope. This prototype keeps eight controlled tags and only one directional bike expansion. Policy changes require before/after review.

## Demonstrated outcome and limits

The fixed full-scene label expects A01 and A02. A03 is a wheel detail: it matches bicycle exactly but is not relevant to that task. Original return A01/A03 has usefulness 1/2 and missing 1/2. Adding bicycle to A02 returns A01/A02/A03: usefulness 2/3 and missing 0/2. The imperfect result is deliberate: metadata correction improves recall without pretending it solves intent-level precision. Exact expected IDs and controls are in Sample_Contract.md.

## Proposed evaluation

This is software evidence from author-assigned fixtures. No people were recruited and no customer/employer outcome, search-speed benefit or statistical result is claimed. Proposed human evaluation asks whether someone can find the intended scene, correctly explain a match, recover from exclusion, and assess a correction before confirming it. Mo's personal review and comprehension are unobserved. Mo owns product/program direction; AI assists implementation and verification.

S043–S052 traceability is in PRD.md. Current release evidence and publication gates are centralized in Validation.md.

## Next investment decision

The next decision is whether metadata correction or a change to the search policy addresses the editor's real intent. Ask collection editors to challenge the full-scene labels and compare the original and corrected results: A02 becomes findable, but A03 remains an unsuitable wheel detail. If editors cannot agree on relevance, resolve the task and labels before expanding synonyms or considering semantic retrieval. If labels hold, compare successful find tasks and correction effort with the current library workflow. Ongoing taxonomy ownership and correction cost must be justified by that benefit; improved fixture recall alone is insufficient.
