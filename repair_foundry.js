/* repair_foundry.js — remove the mangled injected blocks, re-inject with correct /* opener */
const fs = require('fs');

const SRC = fs.readFileSync('00-neural-foundry.html', 'utf8');

/* correct extraction: find the comment opener '/*' before the text */
const cssText = 'THE FOUNDRY MANUAL — LEGO instruction booklet (R15 redesign)';
const cssStart = SRC.lastIndexOf('/*', SRC.indexOf(cssText));
const cssEnd = SRC.indexOf('PREDICTION CARDS');
const CSS_BLOCK = SRC.slice(cssStart, cssEnd);

const jsText = 'THE FOUNDRY MANUAL enhancer';
const jsStart = SRC.lastIndexOf('/*', SRC.indexOf(jsText));
const jsEnd = SRC.indexOf('enhanceNotebooks();') + 'enhanceNotebooks();'.length;
const JS_BLOCK = SRC.slice(jsStart, jsEnd);

/* sanity: both blocks must parse */
try { new Function(JS_BLOCK); console.log('JS block parses OK (' + JS_BLOCK.length + ' chars)'); }
catch (e) { console.log('JS BLOCK STILL BROKEN:', e.message.slice(0, 80)); process.exit(1); }

const TARGETS = ['02-embedding-space.html','03-architecture-forge.html','04-attention-deepdive.html',
'06-alignment-chamber.html','07-neural-telescope.html','08-rag-grounding.html','09-reasoning-agents.html',
'10-evaluation.html','11-deployment.html','12-interpretability.html','13-frontiers.html'];

for (const f of TARGETS) {
    let s = fs.readFileSync(f, 'utf8');
    /* remove mangled JS block: from the garbage line containing the enhancer text to 'enhanceNotebooks();' */
    const gJ = s.indexOf(jsText);
    if (gJ !== -1) {
        const lineStart = s.lastIndexOf('\n', gJ) + 1;
        const callEnd = s.indexOf('enhanceNotebooks();', gJ) + 'enhanceNotebooks();'.length;
        let end = s.indexOf('\n', callEnd); if (end === -1) end = s.length;
        s = s.slice(0, lineStart) + s.slice(end + 1);
    }
    /* remove mangled CSS line (the garbage comment line without /*) */
    const gC = s.indexOf(cssText);
    if (gC !== -1) {
        const lineStart = s.lastIndexOf('\n', gC) + 1;
        let end = s.indexOf('\n', gC); if (end === -1) end = s.length;
        s = s.slice(0, lineStart) + s.slice(end + 1);
    }
    /* re-inject cleanly: CSS before </style>, JS before the main inline script's close */
    const st = s.lastIndexOf('</style>');
    s = s.slice(0, st) + '\n' + CSS_BLOCK + '\n' + s.slice(st);
    /* JS: inject before the LAST inline script close — find the script close that follows the longest inline block */
    const mainEnd = s.lastIndexOf('</script>');
    s = s.slice(0, mainEnd) + '\n' + JS_BLOCK + '\n' + s.slice(mainEnd);
    fs.writeFileSync(f, s);
    console.log(f, 'repaired + re-injected');
}

/* verify all parse */
let bad = [];
for (const f of TARGETS) {
    try {
        const s = fs.readFileSync(f, 'utf8');
        const re = /<script([^>]*)>([\s\S]*?)<\/script>/g; let m, ok = true;
        while ((m = re.exec(s))) { if (!m[1].trim()) { new Function(m[2]); } }
    } catch (e) { bad.push(f); }
}
console.log('parse check:', bad.length ? 'FAIL ' + bad.join(',') : 'ALL 11 MAIN SCRIPTS PARSE OK');