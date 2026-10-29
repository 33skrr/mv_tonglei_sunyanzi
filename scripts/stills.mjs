import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'out', 'stills');
const localTemp = path.join(root, '.tmp');
fs.mkdirSync(outDir, {recursive: true});
fs.mkdirSync(localTemp, {recursive: true});
process.env.TEMP = localTemp;
process.env.TMP = localTemp;
process.env.TMPDIR = localTemp;

const browserExecutable = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const frames = process.env.STILL_FRAMES
  ? process.env.STILL_FRAMES.split(',').map((f) => Number(f.trim()))
  : [90, 330, 560, 800, 1020, 1100, 1300, 1500, 1780, 1950, 2320, 2500, 2700];

console.log('Bundling...');
const serveUrl = await bundle({
  entryPoint: path.join(root, 'src', 'index.ts'),
  publicDir: path.join(root, 'public'),
  onProgress: (progress) => {
    if (progress % 25 === 0) console.log(`  bundle ${progress}%`);
  },
});

console.log('Selecting composition...');
const composition = await selectComposition({
  serveUrl,
  id: 'KindredMV',
  browserExecutable,
  inputProps: {},
});

for (const frame of frames) {
  const output = path.join(outDir, `kindred_${String(frame).padStart(4, '0')}.png`);
  console.log(`Rendering frame ${frame}...`);
  await renderStill({
    composition,
    serveUrl,
    output,
    frame,
    imageFormat: 'png',
    browserExecutable,
    chromiumOptions: {gl: 'angle'},
    inputProps: {},
    overwrite: true,
    onBrowserLog: (log) => {
      if (log.type === 'error') console.log('  browser:', log.text);
    },
  });
  console.log(`  -> ${output}`);
}
console.log('Done.');
