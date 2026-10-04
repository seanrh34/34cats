# Placeholders

Everything in this site that is invented scaffolding, waiting for the real thing.
Items marked `placeholder: true` in `app/data.ts` render a small mint "PLACEHOLDER" flag.

## Data to replace (`app/data.ts`)

| Key | What it is | Replace with |
| --- | --- | --- |
| `status` | "Open to Summer 2027 internships" chip in the hero | The real target roles/season |
| `stats[2]` | "3 languages spoken — English · Bahasa Indonesia · Mandarin" | The actual three languages |
| `projects[4]` ("Project Placeholder") | Whole placeholder project card + case study | A real 5th project (orbital/CS module or similar) |
| `projects[3].image` | Card screenshot for "34cats.com — this site" | A real screenshot of the shipped site |
| `projects[*].caseStudy.metrics[placeholder]` | "—%", "—ms", "—" metric cells | Real measured numbers |
| `education[0].details[2]` | "Coursework placeholder — favourite module so far" | A real NUS module |
| `nowItems` (Building/Learning/Reading/Listening) | The "Now" bento cells | What is actually current |
| `hero.phrases` | Cycling typewriter phrases (style choice) | Adjust copy if desired — not factual |

## Files to replace (`public/placeholders/`)

Drop-in replacements: keep the same filename (or change `image`/`gallery` paths in `data.ts`).

| File | Used by | Replace with |
| --- | --- | --- |
| `photo-fencing.svg` | Off the clock polaroid | Real photo (4:5), fencing at NUS |
| `photo-floorball.svg` | Off the clock polaroid | Real photo (4:5), floorball keeper days |
| `photo-rvrc.svg` | Off the clock polaroid | Real photo (4:5), RVRC orientation |
| `photo-battalion.svg` | Off the clock polaroid | Real photo (4:5), battalion media shoot |
| `photo-hacknroll.svg` | Off the clock polaroid | Real photo (4:5), Hack&Roll 2025 |
| `photo-cats.svg` | Off the clock polaroid | Real photo (4:5), the 34 cats (allegedly) |
| `project-34cats.svg` | Work card for this site | Real screenshot (16:10) |
| `project-placeholder.svg` | Work card for the placeholder project | Real screenshot (16:10) |
| `gallery-*.svg` (10 files) | Case-study gallery strips | Real product screenshots (16:10) |

## Videos (`public/videos/`)

| File | Used by | Replace with |
| --- | --- | --- |
| `placeholder-demo.webm` | Hover video on the "34cats.com" and "Project Placeholder" work cards | Real screen recordings (16:10, muted, a few seconds, ideally < 2 MB) |

Any project can get a hover video: set `video: "/videos/<name>.webm"` (or `.mp4`) on it in `app/data.ts`.
