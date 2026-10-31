import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, 'dist');
await mkdir(out, { recursive: true });
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
  if (entry.isDirectory() || /\.(html|css|js|txt|json|png|jpe?g|svg|webp|ico|mp4)$/i.test(entry.name)) {
    await cp(path.join(root, entry.name), path.join(out, entry.name), { recursive: true });
  }
}
const config = {
  url: process.env.SUPABASE_URL || '',
  key: process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '',
  adminEmail: process.env.SITE_ADMIN_EMAIL || 'sevenfold.ng@gmail.com'
};
await writeFile(path.join(out, 'runtime-config.js'), `window.SEV7N_RUNTIME=${JSON.stringify(config)};\n`);
console.log(`Static site prepared in dist (${config.url ? 'Supabase configured' : 'Supabase env vars missing'}).`);
