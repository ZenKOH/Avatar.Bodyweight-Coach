# Avatar Bodyweight Coach

A standalone, local-first MacBook app for learning safe no-equipment bodyweight exercises with selectable browser-rendered avatars, staged movement demonstrations, voice/sound coaching, and an offline AI-style coaching engine.

## What it does

- 36 no-equipment bodyweight exercises across 6 movement domains.
- Selectable neutral, male, or female browser-rendered avatar with clearer visual differentiation.
- Staged visual demonstrations for each exercise pattern: setup, movement, control, and return.
- Browser voice coach and soft sound cues for movement instructions and technique comments.
- Clear descriptions, instructions, benefits, target body parts, cues, mistakes, and easier/harder options.
- Local AI Coach that builds a readiness-aware session from your time, energy, experience, soreness, sensitivity areas, and goal.
- Progress log stored in the browser only.
- Exportable session plan and CSV-style log.
- Works offline. No account, API key, camera, wearable, backend, or external library.

## Demo upgrade notes

The **Show avatar demo** button now starts a guided stage-by-stage exercise demonstration rather than only scrolling to a static animation. Each demo cycles through four phases and updates the avatar pose, timeline, spoken coaching, and written technique comments.

The avatar is rendered locally in HTML/CSS with skin-tone gradients, hair, face details, clothing, shadows, and different male/female proportions. It is designed to look more realistic than the earlier stick-avatar prototype, but it is still a lightweight browser-rendered educational avatar, not a photorealistic video or medical-grade biomechanical simulation.

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
demo-upgrade.css
app.js
demo-upgrade.js
README.md
LICENSE
.gitignore
```
