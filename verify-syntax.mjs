import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0]?.[1];
if (!script) throw new Error('No inline script found');
new Function(script);
console.log(JSON.stringify({ ok: true, scriptLength: script.length }));
