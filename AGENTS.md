# AGENTS.md

## Project Context

This is `hanaloop-demo`, a minimal Next.js demo app using:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- App Router under `src/app`

Keep the project intentionally small until product requirements justify more structure.

## Next.js Rules

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from prior Next.js versions and older training data.

Before writing or changing Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices and prefer the documented Next.js 16 pattern over assumptions.
<!-- END:nextjs-agent-rules -->

## AI Coding Quality Rules

Use these rules for code changes, reviews, refactors, and documentation updates.

### Check Project Docs

Before writing code, inspect relevant Markdown files under `docs/`.

Use those files as project-specific guidance for workflows, conventions, commit messages, PR descriptions, and implementation expectations. If a docs rule conflicts with `AGENTS.md`, follow `AGENTS.md` first and note the conflict.

### Keep It Simple

Prefer the simplest implementation that solves the current problem.

Avoid unnecessary abstractions, premature generalization, clever code, and new dependencies unless they clearly reduce complexity.

### Make Small, Readable Changes

Keep diffs focused and reviewable. Change only the files needed for the request.

Prefer incremental edits over rewrites unless a rewrite is explicitly requested or clearly safer.

### Understand Before Editing

Inspect relevant files before making changes. Verify APIs, file paths, routing conventions, and package behavior from the repo or local docs.

Do not guess when the answer can be checked locally.

### Preserve Existing Behavior

Do not change unrelated behavior, styling, routes, metadata, or configuration.

If a broader change is necessary, explain why before making it.

### Tailwind CSS Style

When writing Tailwind classes with CSS custom properties, prefer Tailwind 4 shorthand syntax to avoid editor warnings.

- Use `text-(--on-surface-variant)` instead of `text-[var(--on-surface-variant)]`.
- Use `bg-(--surface-container-low)` instead of `bg-[var(--surface-container-low)]`.
- Use `border-(--outline-variant)` instead of `border-[var(--outline-variant)]`.
- Use arbitrary values like `p-[var(--space-md)]` only when there is no equivalent shorthand or token utility.

## Working Checklist

- Read the relevant files first.
- Check relevant `docs/**/*.md` files before writing code.
- Check `node_modules/next/dist/docs/` before Next.js-specific edits.
- Use Tailwind 4 CSS variable shorthand when generating utility classes.
- Prefer local conventions over personal style.
- Keep generated UI and styles minimal unless the user asks for a designed screen.
- Run `npm run lint` and `npm run build` after code changes when practical.
- Leave unrelated user changes untouched.

## Documentation Sync

If these agent rules change, also update related instruction files if they exist:

- `.cursor/rules/karpathy-guidelines.mdc`
- `CLAUDE.md`
- `skills/karpathy-guidelines/SKILL.md`
