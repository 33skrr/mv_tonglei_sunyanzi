import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'out');
const localTemp = path.join(root, '.tmp');
fs.mkdirSync(outDir, {recursive: true});
fs.mkdirSync(localTemp, {recursive: true});
process.env.TEMP = localTemp;
process.env.TMP = localTemp;
process.env.TMPDIR = localTemp;

const browserExecutable = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputLocation = path.join(outDir, 'tonglei-8bit-mv-final2.mp4');

console.log('Bundling...');
const serveUrl = await bundle({
  entryPoint: path.join(root, 'src', 'index.ts'),
  publicDir: path.join(root, 'public'),
});

console.log('Selecting composition...');
const composition = await selectComposition({
  serveUrl,
  id: 'KindredMV',
  browserExecutable,
  inputProps: {},
});

const started = performance.now();
let lastLogged = 0;
await renderMedia({
  composition,
  serveUrl,
  codec: 'h264',
  crf: 18,
  pixelFormat: 'yuv420p',
  outputLocation,
  browserExecutable,
  chromiumOptions: {gl: 'angle'},
  concurrency: 4,
  audioCodec: 'aac',
  audioBitrate: '192k',
  inputProps: {},
  overwrite: true,
  onProgress: ({renderedFrames, encodedFrames, progress}) => {
    if (renderedFrames - lastLogged >= 120 || progress === 1) {
      lastLogged = renderedFrames;
      const elapsed = (performance.now() - started) / 1000;
      console.log(`rendered ${renderedFrames}/${composition.durationInFrames} (${Math.round(progress * 100)}%), encoded ${encodedFrames}, ${elapsed.toFixed(0)}s`);
    }
  },
});

const elapsed = (performance.now() - started) / 1000;
const stat = fs.statSync(outputLocation);
console.log(`Done: ${outputLocation}`);
console.log(`Duration: ${(composition.durationInFrames / composition.fps).toFixed(2)}s, size: ${(stat.size / 1024 / 1024).toFixed(1)} MB, render time: ${(elapsed / 60).toFixed(1)} min`);
