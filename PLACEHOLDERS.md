# Placeholders

Everything in this site that is invented scaffolding, waiting for the real thing.
Items marked `placeholder: true` in `app/data.ts` render a small mint "PLACEHOLDER" flag.

## Data to replace (`app/data.ts`)

| Key | What it is | Replace with |
| --- | --- | --- |
| `status` | "Open to Summer 2027 internships" chip in the hero | The real target roles/season |
| `stats[2]` | "3 languages spoken — English · Bahasa Indonesia · 中文" | The actual three languages |
| `projects[4]` ("Project Placeholder") | Whole placeholder project card + case study | A real 5th project (orbital/CS module or similar) |
| `projects[3].image` | Card screenshot for "34cats.com — this site" | A real screenshot of the shipped site |
| `projects[*].caseStudy.metrics[placeholder]` | "—%", "—ms", "—" metric cells | Real measured numbers |
| `education[0].details[2]` | "Coursework placeholder — favourite module so far" | A real NUS module |
| `nowItems` (Building/Learning/Reading/Listening) | The "Now" bento cells | What is actually current |
| `faqs[1]` | "What kind of roles are you open to?" answer | The roles actually being targeted |
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

## Optional media

- `Project.video` field exists but is unused — set it to a `/public` clip path
  (e.g. `/videos/genai-seo-writer.mp4`) and the work card will loop it on hover.
