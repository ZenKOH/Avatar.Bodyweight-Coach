# Avatar Bodyweight Coach

A standalone, local-first MacBook app for learning safe no-equipment bodyweight exercises with a selectable 3D-style avatar and an offline AI-style coaching engine.

## What it does

- 36 no-equipment bodyweight exercises across 6 movement domains.
- Selectable male or female 3D-style avatar.
- Animated visual demonstrations for each exercise pattern.
- Clear descriptions, instructions, benefits, target body parts, cues, mistakes, and easier/harder options.
- Local AI Coach that builds a readiness-aware session from your time, energy, experience, soreness, sensitivity areas, and goal.
- Progress log stored in the browser only.
- Exportable session plan and CSV-style log.
- Works offline. No account, API key, camera, wearable, backend, or external library.

## How to run on a MacBook

Open the app directly:

```bash
open index.html
```

Or run it as a local site:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## GitHub Pages

This repository can be published through GitHub Pages:

```text
Settings → Pages → Deploy from a branch → main → / (root) → Save
```

Expected URL:

```text
https://zenkoh.github.io/Avatar.Bodyweight-Coach/
```

## Safety scope

This is an educational prototype, not medical advice, physiotherapy, diagnosis, or injury assessment. It does not use a camera or assess form. Stop if you feel pain, dizziness, chest discomfort, faintness, or unusual shortness of breath. People with medical conditions, recent injuries, pregnancy, or major health concerns should consult a qualified professional before exercising.

## Design principles

- Health over appearance.
- Start low and progress gradually.
- All movement counts.
- Prioritise safe technique and recovery.
- AI supports judgement; it does not replace a clinician, coach, teacher, therapist, or parent/guardian.

## Files

```text
index.html
styles.css
app.js
README.md
LICENSE
.gitignore
```