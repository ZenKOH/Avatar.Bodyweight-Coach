# Open and Free 3D Human Model / Mocap Asset Research

This document records candidate sources for upgrading Avatar Bodyweight Coach from a browser-rendered SVG avatar to a true 3D animated avatar pipeline.

## Recommended direction

Use **MakeHuman → Blender → glTF/GLB → Three.js** as the cleanest first production path.

Why:

- MakeHuman can generate adult human variants and exported models are commonly treated as CC0 via the official export exception, but verify every export and any clothing or hair asset.
- Blender can clean topology, rig, retarget animation and export GLB.
- GLB is the simplest browser-friendly delivery format.
- Three.js is MIT-licensed and can render GLB/GLTF with animation clips in-browser.

## Candidate sources

| Source | Role | Licence / rights note | Recommended use |
|---|---|---|---|
| MakeHuman | Human model generator | App/data AGPL; exported official models commonly CC0 via export exception | Best first route for clothed exercise avatars |
| MB-Lab | Blender human model add-on | GPL/AGPL family; generated characters may inherit AGPL obligations | Useful for experiments; avoid bundling without licence review |
| VALID Avatar Library | Rigged diverse avatars | Free research library; verify package licence | Useful for inclusion/diversity testing |
| Anny Body Model | Open parametric body model | Apache 2.0 reported by authors | Promising future technical route |
| CMU Mocap Database | Mocap source | Public research database; sequence terms require review | Motion reference and retargeting source |
| AMASS / BABEL | Motion corpus and labels | Research terms vary by source dataset | Research/reference, not direct bundling |
| Mixamo | Auto-rigging and animation pipeline | Free-to-use but not open-source | Useful for rigging/retargeting; do not bundle downloaded assets without Adobe terms review |
| Three.js | Browser 3D renderer | MIT | Use for future GLB animation viewer |

## Why this repository does not bundle third-party avatars yet

This repository does not yet bundle external human model or mocap files. That is deliberate. Human models and motion clips are often large and have licence conditions that differ from software code. Any model, texture, rig or animation added to this repository should include:

1. Source URL.
2. Licence text.
3. Attribution requirement.
4. Modification history.
5. Allowed redistribution statement.
6. Medical/fitness safety review status.

## Practical Blender workflow

1. Generate a clothed adult model in MakeHuman or another validated open model source.
2. Export to Blender.
3. Clean clothing intersections and hair geometry.
4. Apply a standard humanoid skeleton.
5. Retarget motion clips for each exercise domain.
6. Bake animations into named clips: `squat`, `lunge`, `bridge`, `push`, `plank`, `deadbug`, `balance`, `cardio`, `stretch`, `inchworm`, `burpee`, `calf`, `row`.
7. Export as GLB.
8. Add files under `assets/3d/` with attribution.
9. Load with Three.js GLTFLoader and AnimationMixer.

## Safety note

A photorealistic model can make a demo feel authoritative. That increases the obligation to avoid unsafe form. Every animation should be reviewed as educational movement guidance, not as a clinical prescription.