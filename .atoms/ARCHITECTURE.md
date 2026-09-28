last_updated: 2026-09-19T04:12:41Z
Architecture Design
System Overview
A single-page, scroll-driven cinematic landing experience for an AI-assisted historical manuscript restoration platform (“PALIMPSEST”). One fixed WebGL canvas renders a continuous 3D archaeological corridor containing the four supplied source films as media planes; a document-flow stack of eleven full-height acts (hero → artifact → restoration → script → analysis → transcription → reconstruction → uncertainty → interpretation → process → access request) renders above it. Both layers read the same normalized scroll value, so camera position and copy are always synchronized and the narrative stays readable even when the 3D layer is slow or unavailable.

Data flow: window.scrollY → scrollStore (normalized 0…1 + smoothed) → CameraController (position/lookAt interpolation) and VideoPlane (playback/pause per station) → rendered by LandingCanvas. Text content is static and lives in src/components/landing/* plus src/data/manuscriptScenes.ts.

Tech Stack
Layer	Choice
Build / dev	Vite 5 + @vitejs/plugin-react-swc, TypeScript 5
UI	React 18, Tailwind CSS 3, shadcn/ui primitives (Radix)
Routing	react-router-dom (/ → Index, /blog/* prerendered)
3D	Three.js 0.166 + @react-three/fiber 8 (no drei)
SEO	vite-plugin-sitemap, vite-prerender-plugin
State	Lightweight module store (scrollStore) + React hooks; no server backend
Module Design
Module	Responsibility	Key Files
Route shell	Mount the journey, keep /blog/ reachable	src/App.tsx, src/pages/Index.tsx
Scene data	Single source of truth for the four videos, posters, camera path, scroll ranges, transitions	src/data/manuscriptScenes.ts
Scroll core	Normalize/smooth scroll, quality tiers, reveal helpers, WebGL probe, section navigation	src/lib/scrollStore.ts, src/lib/acts.ts
3D world	Canvas composition, camera, lighting, environment geometry, video planes, transitions, procedural textures	src/components/three/*
Narrative acts	Eleven full-height content sections with reveal-on-intersection copy	src/components/landing/*
Shared UI	Evidence / abstention / confidence presentation, spatial labels	src/components/common/*, src/components/landing/SceneLabel.tsx
Chrome	Navigation, chapter rail, progress bar, footer	src/components/layout/TopNav.tsx, src/components/layout/Footer.tsx, src/pages/Index.tsx
Conversion	Access-request form with validation + localStorage persistence + confirmation reference	src/components/landing/FinalCtaScene.tsx
Theme	Archival palette, scrims, panels, reveal + reduced-motion rules	src/index.css, tailwind.config.ts, index.html
Tech Decisions
Decision	Choice	Rationale
Overlay layout	Acts in normal document flow, not fixed scroll-fading layers	Fixed layers collapsed to an apparently empty viewport in validation; flow sections guarantee readable copy at every scroll offset
Video integration	<video> elements as VideoTexture on in-world planes, lazy + muted + playsInline	Keeps the four supplied films inside the 3D journey without autoplay policy violations
Scroll coupling	One shared store drives camera and video state	Footage and copy cannot drift apart
WebGL absence	StaticJourney fallback: same four films as sequential native <video controls> blocks	No artwork invented; the story survives on hardware without a GPU
Motion sensitivity	prefers-reduced-motion disables reveals, letterbox bars and smooth scrolling	Accessibility without losing content
Performance	Intersection-triggered lazy video load, scroll-pause of offscreen playback, quality tiers, three/fiber split into three-vendor chunk	Cuts the main chunk from 1.38 MB to 570 kB and removes the bundle-size warning
Pointer parallax	Window-level pointer listener on the camera only	Overlay UI stays clickable; no invisible capture layer
Persistence	Access requests stored in localStorage with a generated reference id	No backend was requested; the form is a real end-to-end path, not a fake success state
File Tree Plan
app/frontend/
├── index.html                  # metadata + archival font imports
├── vite.config.ts              # swc, atoms, sitemap, prerender, manualChunks
├── tailwind.config.ts          # archival color + type tokens
├── public/videos/              # 4 supplied films + extracted poster frames
└── src/
    ├── App.tsx                 # route shell
    ├── index.css               # theme, scrims, panels, reveal, reduced-motion
    ├── data/manuscriptScenes.ts
    ├── lib/{scrollStore,acts}.ts
    ├── components/
    │   ├── three/{LandingCanvas,CameraController,VideoPlane,SceneEnvironment,
    │   │          SceneTransition,Lighting,textureUtils}
    │   ├── landing/{Hero,Artifact,Restoration,Script,Analysis,Transcription,
    │   │            Reconstruction,Uncertainty,Interpretation,Process,FinalCta}Scene.tsx
    │   │            + SceneLabel.tsx
    │   ├── common/{EvidenceCard,AbstentionCard,ConfidenceBadge}.tsx
    │   └── layout/{TopNav,Footer}.tsx
    └── pages/Index.tsx
Implementation Guide
Edit narrative copy inside the matching src/components/landing/*Scene.tsx; keep every act a full-height section so the fixed canvas never owns the text.
To add or reorder a station, update src/data/manuscriptScenes.ts (video, poster, camera anchor, scroll range, transition) — the camera path and chapter rail derive from it.
Scroll behaviour lives only in src/lib/scrollStore.ts; never read window.scrollY inside components.
New 3D primitives go under src/components/three/; reuse textureUtils for glow/grid/dust/label sprites instead of adding image assets.
Visual tokens come from tailwind.config.ts + src/index.css (.panel, .scrim-*, .eyebrow, .rule-gold) — avoid one-off hex values.
Verify with pnpm run lint && pnpm run build; the build prerenders / and /blog/, so route changes must stay compatible with vite-prerender-plugin.