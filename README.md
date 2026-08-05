# LLM Academy — Build a Transformer From Nothing

A from-scratch, hands-on course in neural networks and large language models.
**Fourteen interactive modules**: build the tokenizer, the embeddings, the attention
engine, the training loop, the RAG pipeline, and the frontier mission — with your
own hands, in your browser. No frameworks, no hidden layers: every number on every
page is computed live, in JavaScript, from the equations being taught.

> The course is a **workshop**, not a video. Every lab is a construction: you place
> the words, stack the transformer, assemble the query, route the expert, pack the
> dock. The space decides — and when a concept forbids something, the space refuses.

## Quickstart

No build step. No dependencies. Open `index.html` in any modern browser, or host
the folder as static files:

```bash
# serve locally
python -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`.

## The Journey

| Plate | Modules | What you build |
|---|---|---|
| Foundations | 00–02 | Neurons, tokenizers, embeddings — the geometry of meaning |
| The Core Engine | 03–04 | The transformer: architecture, attention — built by hand |
| Training & Alignment | 05–06 | Loss, gradients, RLHF — the machine learns to behave |
| The LLM, Applied | 07–11 | A real seeded transformer, RAG, agents, evaluation, deployment |
| The Frontier | 12–13 | Interpretability, scaling laws — where the field is going |

## What you get

No certificates. This is a workshop — the reward is the build.
- **Per module**: pass the exam (4/5) and you collect the module's **brick** —
  a LEGO-set-style title ("The Word Cartographer", "The Attention Artisan",
  "The Loom Weaver"…) stored on your wall — plus a skill **tier**
  (Brick Collector → Apprentice → Skilled → Master Builder; your overall level
  is only as strong as your weakest brick).
- **Course end**: place all 14 bricks and the hub reveals **Your Model Card** —
  the 14-brick wall, your final title ("The Transformer's Architect"), a
  set-style serial number, and the promise kept: open a blank file and write a
  working transformer, tokenizer, and training loop from memory. Printable.

## Technical notes

- Pure static HTML/CSS/JS — zero build tools, zero runtime dependencies.
- One file per module (00–13) + `index.html` (the Build World hub).
- Audio: 14 original LEGO-theme study tracks (OGG, in `assets/sounds/light/`),
  transcoded from the author's own recordings. UI sounds via WebAudio.
- Deploys to any static host (Vercel, Netlify, GitHub Pages) with no configuration.

## Repository layout

```
index.html                  — the Build World hub (isometric station map)
00-…–13-….html              — the fourteen modules
assets/sounds/light/        — the 14 study tracks (OGG, served by the radio)
README.md · LICENSE · NOTICE — docs, license, LEGO® notice
vercel.json · robots.txt     — deployment configuration
```

## Credits

Co-created by **Aditya Pagare** and AI — the main author and the machine,
building the course together, brick by brick. Every lab was designed by a
human who decided what to teach; every line was written, audited, and
hardened by the two of them working as one team.

## Legal

**LEGO® is a trademark of the LEGO Group.** This project is an independent,
non-commercial educational work. It is **not affiliated with, endorsed by, or
sponsored by the LEGO Group.** The LEGO-themed visual language (bricks, studs,
building metaphors) is used as an educational metaphor. See `NOTICE` and
`LICENSE` for details.

## License

MIT — see `LICENSE`. The study tracks are © the author; reused within this course
only. Do not redistribute the audio outside this project.
