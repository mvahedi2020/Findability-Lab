# Decisions and risks
| Decision | Alternative | Product reason / remaining risk |
|---|---|---|
| Whole-token AND search with selectable fields | Semantic ranking or fuzzy substring | Matching reasons remain reproducible; spelling and phrase variation can miss assets. |
| Directional bike → bike/bicycle | Large hidden thesaurus | One visible expansion is understandable; terminology coverage is intentionally small. |
| One-record controlled tag correction | Automated bulk inference | Preserves original evidence and scope; editor judgment could still be wrong. |
| Fixed relevance labels | Relabel after intervention | Prevents moving the evaluation goal; author labels require human critique. |
| Drawer with focus | Another management dashboard | Keeps asset intent central; long evidence scrolls inside the drawer. |
| Single previous search view | Persist every view or multi-step history | Recovery is reversible and bounded; refresh deliberately starts default search. |
| Journal replay and raw-byte preview guard | Trust revision number only | Same-revision external edits cannot be silently overwritten; readable conflicts require reload or reset. |
| Memory continuity when storage fails | Block the whole experience | Useful tab remains usable with honest warning; persistence is unverified and refresh may lose work. |
| Latest-edit inverse Undo | Restore whole snapshot | Unrelated metadata is untouched; toggling Undo again redoes the latest inverse and appends history. |
| Explicit destructive reset without Undo | Restore invalid raw storage | Invalid bytes are preserved until reset; reset permanently discards saved edits/history. |

Choices are visibly provisional until proposed human evaluation. No research, commercial result or manual-coding claim is implied. Release status is maintained in Validation.md.

When saved storage cannot be read, durable writes are not attempted even if writing would succeed. Confirmed edits and reset affect memory only; unseen saved bytes remain intact. The review explicitly discloses this boundary.
