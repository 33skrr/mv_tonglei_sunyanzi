export const W = 480;
export const H = 270;
export const FPS = 24;
export const BPM = 100;
export const BEAT = 60 / BPM;

export const CN_FONT = "'Fusion Pixel 12px Proportional SC', 'Microsoft YaHei', monospace";
export const EN_FONT = "'Press Start 2P', monospace";

export const C = {
  ink: '#0a0808',
  night0: '#080a12',
  night1: '#0c0f1b',
  night2: '#111627',
  night3: '#192036',
  blue: '#26324a',
  blueHi: '#4e5c72',
  cyan: '#8ca99e',
  cyanHi: '#e3e3cf',
  cyanDim: '#536e66',
  magenta: '#c07a70',
  magentaDim: '#714a45',
  orange: '#e0a263',
  orangeHi: '#f7d7a4',
  yellow: '#d9b35d',
  yellowHi: '#f2dfa3',
  yellowDim: '#90722f',
  red: '#ad574d',
  skin: '#ecc0a1',
  skinHi: '#f8d5b7',
  skinShadow: '#b77b68',
  hair: '#242030',
  hairHi: '#45404f',
  hairShadow: '#15121c',
  white: '#f1eadb',
  paper: '#e2d5bb',
  green: '#b4bd93',
  greenDim: '#657255',
  teal: '#587a77',
  brown: '#64473d',
  stone: '#34394a',
  stoneHi: '#556071',
  black: '#050608',
} as const;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const snap = (v: number) => Math.round(v);

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}

export function mixColor(a: string, b: string, t: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const f = clamp01(t);
  const c = (x: number, y: number) => Math.round(lerp(x, y, f)).toString(16).padStart(2, '0');
  return `#${c(ar, br)}${c(ag, bg)}${c(ab, bb)}`;
}

export function beatOf(seconds: number) {
  return seconds / BEAT;
}

export function beatPulse(seconds: number, decay = 7) {
  const b = beatOf(seconds);
  const phase = b - Math.floor(b);
  return Math.exp(-phase * decay);
}

/** Small deterministic step-clock for hand-drawn animation at 8 fps. */
export function stepClock(frame: number, fps = 8, offset = 0) {
  return Math.floor((frame + offset) / (FPS / fps));
}

export type Point = {x: number; y: number};
