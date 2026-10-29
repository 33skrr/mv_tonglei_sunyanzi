export const FPS = 24;
export const SONG_SECONDS = 212.708;
export const DURATION_IN_FRAMES = 5105;
export const TOTAL_TIMECODE = '03:32:17';

const f = (seconds: number) => Math.round(seconds * FPS);

export const SCENES = {
  title: {from: 0, to: 188},
  city: {from: 182, to: 421},
  crowd: {from: 415, to: 661},
  seat: {from: 655, to: 1016},
  portrait: {from: 1010, to: 1273},
  room: {from: 1267, to: 1542},
  alley: {from: 1536, to: 2034},
  subway: {from: 2028, to: 2882},
  roofArrival: {from: 2876, to: 3308},
  roofTogether: {from: 3302, to: 4044},
  bridge: {from: 4038, to: 4250},
  end: {from: 4244, to: 4770},
} as const;

export type SceneName = keyof typeof SCENES;

export type Subtitle = {
  from: number;
  to: number;
  lines: string[];
  label?: string;
};

/**
 * Timestamps follow the supplied LRC. Short lines are paired so they do not
 * flash on screen for less than a second.
 */
export const SUBTITLES: Subtitle[] = [
  {from: f(21.61), to: f(26.58), lines: ['雨后的城市']},
  {from: f(26.58), to: f(31.8), lines: ['寂寞又狼狈']},
  {from: f(31.8), to: f(36.91), lines: ['路边的座位']},
  {from: f(36.91), to: f(42.32), lines: ['它空着在等谁']},
  {from: f(42.32), to: f(47.35), lines: ['我拉住时间']},
  {from: f(47.35), to: f(52.81), lines: ['它却不理会']},
  {from: f(52.81), to: f(56.44), lines: ['有没有别人']},
  {from: f(56.44), to: f(64.096), lines: ['跟我一样很想被安慰']},
  {from: f(64.096), to: f(67.299), lines: ['风 停了又吹']},
  {from: f(67.299), to: f(69.486), lines: ['我忽然想起谁']},
  {from: f(69.486), to: f(72.308), lines: ['天 亮了又黑']},
  {from: f(72.308), to: f(74.647), lines: ['我过了好几岁']},
  {from: f(74.647), to: f(77.058), lines: ['心 暖了又灰']},
  {from: f(77.058), to: f(84.816), lines: ['世界', '有时候孤单的很需要另一个同类']},
  {from: f(84.816), to: f(87.379), lines: ['爱 收了又给']},
  {from: f(87.379), to: f(90.096), lines: ['我们都不太完美']},
  {from: f(90.096), to: f(92.257), lines: ['梦 作了又碎']},
  {from: f(92.257), to: f(99.507), lines: ['我们有几次机会 去追']},
  {from: f(99.507), to: f(104.519), lines: ['我拉住时间']},
  {from: f(104.519), to: f(109.638), lines: ['它却不理会']},
  {from: f(109.638), to: f(113.388), lines: ['有没有别人']},
  {from: f(113.388), to: f(120.0), lines: ['跟我一样很想被安慰']},
  {from: f(137.828), to: f(140.488), lines: ['风 停了又吹']},
  {from: f(140.488), to: f(142.798), lines: ['我忽然想起谁']},
  {from: f(142.798), to: f(145.158), lines: ['天 亮了又黑']},
  {from: f(145.158), to: f(147.548), lines: ['我又过了好几岁']},
  {from: f(147.548), to: f(149.828), lines: ['心 暖了又灰']},
  {from: f(149.828), to: f(157.128), lines: ['世界', '有时候孤单的很需要另一个同类']},
  {from: f(157.128), to: f(159.408), lines: ['爱 收了又给']},
  {from: f(159.408), to: f(161.837), lines: ['我们都不太完美']},
  {from: f(161.837), to: f(164.147), lines: ['梦 作了又碎']},
  {from: f(164.147), to: f(168.448), lines: ['我们有几次机会 去追']},
  {from: f(168.448), to: f(171.318), lines: ['不晓得为什么爱']},
  {from: f(171.318), to: f(177.027), lines: ['又稀少又昂贵']},
  {from: f(177.027), to: f(181.837), lines: ['云在半空中']},
  {from: f(181.837), to: f(186.918), lines: ['被微风剪碎']},
  {from: f(186.918), to: f(190.897), lines: ['回忆也许美']},
  {from: f(190.897), to: f(196.858), lines: ['可是正在飞走对不对']},
];

export const sceneDuration = (scene: SceneName) => SCENES[scene].to - SCENES[scene].from;
