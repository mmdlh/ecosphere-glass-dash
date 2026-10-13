<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Platform architecture
- Keep the six monitoring areas as separate TanStack routes sharing dashboard primitives, with distinct composition per area; this preserves navigable URLs without duplicating controls.
- Load ECharts dynamically inside client effects, resize with ResizeObserver, and replace options with notMerge; this avoids SSR and stale-series problems.
- Centralize visual tokens and glass/map layouts in src/styles.css; this keeps the environmental visual system consistent.
- Monitoring values are explicitly demonstration data in browser-safe modules until live sources are connected; this avoids implying real telemetry.
