last_updated: 2026-09-19T04:12:41Z
Requirements & Progress
Requirements Overview
Finalize and validate a cinematic, responsive React/TypeScript landing page for an AI-assisted historical manuscript restoration platform: one continuous 3D scroll journey built around the four user-supplied films, with readable narrative overlays from discovery through the access-request CTA, graceful degradation without WebGL, reduced-motion support, and a production build.

User Stories
As a visitor, I scroll once through a single continuous journey (discovery → restoration → script → analysis → transcription → reconstruction → uncertainty → interpretation → process → access) and always read the copy, even while the 3D footage plays behind it.
As a visitor on weak hardware or a blocked GPU, I still see the same four films in the same order with native player controls.
As a researcher, I can submit an access request and get a real confirmation reference that survives a reload.
As a user with vestibular sensitivity, I get the full content without animated reveals, letterbox bars or smooth scrolling.
As a mobile visitor, every act, card and form field fits without horizontal scrolling.
Task Breakdown
[x] Initialize Vite + React + TS + Tailwind/shadcn template
[x] Install and wire Three.js + React Three Fiber
[x] Copy and verify the four supplied videos + generate poster frames
[x] Build the continuous corridor world (lighting, geometry, dust, labels, transitions)
[x] Implement scroll-driven camera + synchronized video planes
[x] Author the eleven narrative acts with evidence/abstention/confidence UI
[x] Convert overlays to document-flow full-height sections (fix empty-viewport render)
[x] Add WebGL fallback, reduced-motion handling, overflow prevention
[x] Implement responsive nav, chapter rail, progress bar, footer
[x] Implement CTA form validation + localStorage persistence + confirmation id
[x] pnpm run lint clean
[x] pnpm run build clean; split three-vendor to clear the bundle-size warning
[x] Browser render validation passed (grade 3)
[x] Raise body-copy size / scrim contrast / nav legibility after validation feedback
[x] Add per-station poster fallback so video planes are never black slabs
[x] Populate .atoms/ARCHITECTURE.md and .atoms/PROGRESS.md
Progress Log
2026-09-19: Template initialized; R3F + Three installed; four films copied to public/videos/ and verified non-empty; poster frames extracted.
2026-09-19: Continuous corridor world completed — LandingCanvas, CameraController, VideoPlane, SceneEnvironment, SceneTransition, Lighting, textureUtils.
2026-09-19: Eleven narrative acts authored; evidence, abstention and confidence components added; nav, chapter rail, progress bar and footer wired.
2026-09-19: Fixed-layer overlays replaced by document-flow full-height sections with reveal-on-intersection plus timeout fallback (root cause of the earlier grade-1 empty render).
2026-09-19: WebGL StaticJourney fallback, prefers-reduced-motion rules, lazy/muted video playback with scroll pausing, and overflow guards added.
2026-09-19: Access-request form validated and persisted to localStorage with a generated confirmation reference.
2026-09-19: pnpm run lint passed; pnpm run build passed and prerendered / and /blog/.
2026-09-19: manualChunks now isolates three/@react-three/fiber: main chunk 1380 kB → 570 kB, three-vendor 810 kB, size warning cleared; build re-verified.
2026-09-19: Browser validation passed (Render Grade 2) — all sections, nav and footer render with readable copy; noted feedback that the palette is very dark and body copy small.
2026-09-19: ARCHITECTURE.md and PROGRESS.md populated from the shipped code.
2026-09-19: Legibility pass — .text-xs/.text-sm floors, stronger scrims/panels, brighter eyebrow + nav labels; render grade improved 2 → 3.
2026-09-19: VideoPlane now maps a still from each supplied film behind the video and reveals the footage only after loadeddata, so stations never render as black rectangles; lint + build re-verified clean.