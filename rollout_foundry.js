/* rollout_foundry.js — extract the Foundry Manual (CSS + enhancer) from 00 and inject into 02-13 */
const fs = require('fs');

const SRC = fs.readFileSync('00-neural-foundry.html', 'utf8');

/* extract CSS: from the Foundry Manual comment to the PREDICTION CARDS comment */
const cssStart = SRC.indexOf('THE FOUNDRY MANUAL — LEGO instruction booklet (R15 redesign)');
const cssEnd = SRC.indexOf('PREDICTION CARDS');
if (cssStart === -1 || cssEnd === -1 || cssEnd < cssStart) { console.log('CSS extract fail', cssStart, cssEnd); process.exit(1); }
const CSS_BLOCK = SRC.slice(cssStart - 3, cssEnd);

/* extract JS: from the enhancer comment through enhanceNotebooks(); */
const jsStart = SRC.indexOf('THE FOUNDRY MANUAL enhancer');
const jsEnd = SRC.indexOf('enhanceNotebooks();') + 'enhanceNotebooks();'.length;
if (jsStart === -1 || jsEnd === -1) { console.log('JS extract fail'); process.exit(1); }
const JS_BLOCK = SRC.slice(jsStart - 3, jsEnd);

const TARGETS = ['02-embedding-space.html','03-architecture-forge.html','04-attention-deepdive.html',
'06-alignment-chamber.html','07-neural-telescope.html','08-rag-grounding.html','09-reasoning-agents.html',
'10-evaluation.html','11-deployment.html','12-interpretability.html','13-frontiers.html'];

let done = 0, skip = [];
for (const f of TARGETS) {
    let s = fs.readFileSync(f, 'utf8');
    if (s.includes('THE FOUNDRY MANUAL enhancer')) { skip.push(f + ' (already)'); continue; }
    if (!s.includes('.notebook-spread')) { skip.push(f + ' (no notebooks)'); continue; }
    /* CSS before </style> (end = wins the cascade) */
    const st = s.lastIndexOf('</style>');
    if (st === -1) { skip.push(f + ' (no style)'); continue; }
    s = s.slice(0, st) + '\n' + CSS_BLOCK + '\n' + s.slice(st);
    /* JS before the last </script> (after initNotebook calls in the main block) */
    const sc = s.lastIndexOf('</script>');
    if (sc === -1) { skip.push(f + ' (no script)'); continue; }
    s = s.slice(0, sc) + '\n' + JS_BLOCK + '\n' + s.slice(sc);
    fs.writeFileSync(f, s);
    done++;
    console.log(f, 'Foundry Manual injected');
}
console.log('done:', done, '| skipped:', skip.join(', ') || 'none');