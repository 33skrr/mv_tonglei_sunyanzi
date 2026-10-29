import React, {useMemo} from 'react';
import {interpolate, Easing} from 'remotion';
import {C, CN_FONT, EN_FONT, H, W, mixColor, mulberry32} from '../theme';
import {Cloud, Dither, FishSprite, Moon, PixelLabel, Rain, StarField} from './Primitives';

type Building = {
  x: number;
  w: number;
  h: number;
  top: number;
  lit: number;
  seed: number;
};

function makeBuildings(seed: number, count: number, opts: {minH: number; maxH: number; spacing: number; startX?: number; baseline?: number}) {
  const rand = mulberry32(seed);
  const out: Building[] = [];
  let x = opts.startX ?? -30;
  for (let i = 0; i < count; i++) {
    const w = 18 + Math.floor(rand() * 38);
    const h = opts.minH + Math.floor(rand() * (opts.maxH - opts.minH));
    const baseline = opts.baseline ?? 204;
    out.push({x, w, h, top: baseline - h, lit: 0.45 + rand() * 0.4, seed: Math.floor(rand() * 100000)});
    x += w + Math.floor(rand() * opts.spacing) - 3;
    if (x > W + 80) break;
  }
  return out;
}

const farBuildings = makeBuildings(21, 30, {minH: 38, maxH: 95, spacing: 12, startX: -40, baseline: 190});
const midBuildings = makeBuildings(8, 22, {minH: 52, maxH: 132, spacing: 16, startX: -30, baseline: 213});

const BuildingLayer: React.FC<{
  buildings: Building[];
  frame: number;
  color: string;
  windowColors: string[];
  parallax: number;
  alpha?: number;
  maxWindows?: number;
}> = ({buildings, frame, color, windowColors, parallax, alpha = 1, maxWindows = 5}) => {
  return (
    <g transform={`translate(${Math.round(parallax)} 0)`} opacity={alpha}>
      {buildings.map((b, bi) => {
        const rand = mulberry32(b.seed);
        const windows: React.ReactNode[] = [];
        const cols = Math.max(1, Math.floor((b.w - 5) / 5));
        const rows = Math.max(1, Math.floor((b.h - 10) / 7));
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            if (rand() > b.lit * 0.72) continue;
            const wx = b.x + 3 + col * 5;
            const wy = b.top + 5 + row * 7;
            const colorPick = windowColors[Math.floor(rand() * windowColors.length)];
            const flicker = rand() > 0.9 && Math.floor(frame / (8 + Math.floor(rand() * 12))) % 2 === 0;
            windows.push(
              <rect
                key={`${bi}-${row}-${col}`}
                x={wx}
                y={wy}
                width={2}
                height={3}
                fill={flicker ? C.black : colorPick}
                opacity={0.55 + rand() * 0.45}
              />,
            );
          }
        }
        return (
          <g key={bi}>
            <rect x={b.x} y={b.top} width={b.w} height={b.h} fill={color} />
            <rect x={b.x} y={b.top} width={b.w} height={1} fill={C.blueHi} opacity={0.18} />
            {b.h > 80 ? (
              <>
                <rect x={b.x + 5} y={b.top - 8} width={2} height={8} fill={color} />
                <rect
                  x={b.x + 4}
                  y={b.top - 10}
                  width={4}
                  height={2}
                  fill={Math.floor(frame / 20 + b.seed) % 2 ? C.red : C.magentaDim}
                />
              </>
            ) : null}
            {windows.slice(0, maxWindows * 20)}
          </g>
        );
      })}
    </g>
  );
};

export const CitySky: React.FC<{
  frame: number;
  pan?: number;
  mood?: 'night' | 'dawn';
  rainAmount?: number;
  stars?: boolean;
}> = ({frame, pan = 0, mood = 'night', rainAmount = 80, stars = true}) => {
  const dawn = mood === 'dawn';
  const bands = dawn
    ? ['#101a36', '#1c2a4d', '#3b3b62', '#6f4f70', '#b66b73', '#e39a83', '#ffd4a1']
    : ['#050813', '#070c1b', '#0a1024', '#0c142c', '#101a36', '#14203f', '#19294a'];
  return (
    <g>
      {bands.map((color, i) => (
        <rect key={i} x={0} y={i * 22} width={W} height={24} fill={color} />
      ))}
      {dawn ? (
        <>
          <rect x={0} y={132} width={W} height={20} fill="#f2b88a" opacity={0.17} />
          <rect x={0} y={140} width={W} height={10} fill="#ffe0ac" opacity={0.1} />
        </>
      ) : (
        <Dither x={0} y={122} w={W} h={30} color="#253b65" opacity={0.18} id={`sky-dither-${mood}`} />
      )}
      {stars ? <StarField frame={frame} count={dawn ? 18 : 80} seed={dawn ? 55 : 7} top={0} height={120} opacity={dawn ? 0.25 : 0.8} /> : null}
      {!dawn ? <Moon x={372 - pan * 0.05} y={22} scale={2} /> : null}
      <g transform={`translate(${Math.round(-pan * 0.1)} 0)`} opacity={dawn ? 0.55 : 0.8}>
        <Cloud x={14 + ((frame * 0.035) % 80)} y={33} scale={0.8} color={dawn ? '#7b5570' : '#111a36'} opacity={0.75} />
        <Cloud x={284 + ((frame * 0.025) % 120)} y={19} scale={1.05} color={dawn ? '#a26378' : '#0d1630'} opacity={0.6} />
        <Cloud x={174 + ((frame * 0.018) % 60)} y={69} scale={0.6} color={dawn ? '#9b5b70' : '#172449'} opacity={0.5} />
      </g>
      <g transform={`translate(${Math.round(-pan * 0.22)} 0)`}>
        <BuildingLayer
          buildings={farBuildings}
          frame={frame}
          color={dawn ? '#3b3450' : '#0a1228'}
          windowColors={dawn ? ['#ffcf96', '#ffe7b4', '#90b4bb'] : ['#e8c777', '#cfa77c', '#c98b79']}
          parallax={0}
          alpha={dawn ? 0.72 : 1}
          maxWindows={2}
        />
      </g>
      {rainAmount > 0 ? <Rain frame={frame} count={rainAmount} top={0} bottom={190} speed={4} opacity={0.25} seed={9} /> : null}
    </g>
  );
};

export const NeonSign: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  color?: string;
  vertical?: boolean;
  frame?: number;
  size?: number;
  broken?: boolean;
}> = ({x, y, w, h, text, color = C.cyan, vertical = false, frame = 0, size = 7, broken = false}) => {
  const flicker = broken ? (frame % 53 > 6 ? 0.25 : 1) : 1;
  const letters = text.split('');
  return (
    <g transform={`translate(${x} ${y})`} opacity={flicker}>
      <rect x={-3} y={-3} width={w + 6} height={h + 6} fill={color} opacity={0.05} />
      <rect x={0} y={0} width={w} height={h} fill={C.black} />
      <rect x={1} y={1} width={w - 2} height={h - 2} fill={color} opacity={0.08} />
      <rect x={0} y={0} width={w} height={1} fill={color} opacity={0.75} />
      <rect x={0} y={h - 1} width={w} height={1} fill={color} opacity={0.75} />
      <rect x={0} y={0} width={1} height={h} fill={color} opacity={0.75} />
      <rect x={w - 1} y={0} width={1} height={h} fill={color} opacity={0.75} />
      {vertical
        ? letters.map((letter, i) => (
            <text
              key={i}
              x={w / 2}
              y={size + 4 + i * (size + 2)}
              textAnchor="middle"
              fill={color}
              fontFamily={CN_FONT}
              fontSize={size}
              style={{paintOrder: 'stroke', stroke: C.black, strokeWidth: 0.5}}
            >
              {letter}
            </text>
          ))
        : (
            <text
              x={w / 2}
              y={h / 2 + size * 0.38}
              textAnchor="middle"
              fill={color}
              fontFamily={CN_FONT}
              fontSize={Math.min(size, h - 5)}
              style={{paintOrder: 'stroke', stroke: C.black, strokeWidth: 0.5}}
            >
              {text}
            </text>
          )}
      <rect x={2} y={h - 3} width={1} height={1} fill={C.white} opacity={0.6} />
    </g>
  );
};

export const LampPost: React.FC<{x: number; y: number; frame: number; color?: string; scale?: number}> = ({
  x,
  y,
  frame,
  color = C.orange,
  scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={0} y={-62} width={2} height={64} fill={C.stoneHi} />
    <rect x={-2} y={2} width={6} height={2} fill={C.stone} />
    <rect x={1} y={-66} width={9} height={2} fill={C.stoneHi} />
    <rect x={8} y={-64} width={2} height={4} fill={C.stoneHi} />
    <rect x={7} y={-60} width={4} height={3} fill={color} />
    <rect x={7} y={-60} width={4} height={1} fill={C.orangeHi} />
    {[5, 4, 3, 2].map((i) => (
      <polygon
        key={i}
        points={`${9 - i * 3},${-57} ${9 + i * 3},${-57} ${9 + i * 5},2 ${9 - i * 5},2`}
        fill={color}
        opacity={0.018 + i * 0.008}
      />
    ))}
    <rect x={6} y={-56} width={6} height={2} fill={color} opacity={0.12} />
    <rect x={-2} y={2} width={6} height={1} fill={color} opacity={0.2} />
    <rect x={-4} y={2} width={10} height={1} fill={color} opacity={0.1} />
    <rect x={7} y={-59 + (Math.sin(frame * 0.11) > 0.94 ? 1 : 0)} width={4} height={1} fill={C.white} opacity={0.8} />
  </g>
);

export const Puddle: React.FC<{x: number; y: number; w: number; color?: string; phase?: number; frame?: number}> = ({
  x,
  y,
  w,
  color = C.cyan,
  phase = 0,
  frame = 0,
}) => {
  const shimmer = Math.sin((frame + phase) * 0.1) > 0 ? 0.18 : 0.08;
  return (
    <g>
      <rect x={x + 3} y={y} width={w - 6} height={1} fill={color} opacity={shimmer} />
      <rect x={x + 1} y={y + 1} width={w - 2} height={1} fill={color} opacity={shimmer * 1.4} />
      <rect x={x} y={y + 2} width={w} height={2} fill={color} opacity={shimmer} />
      <rect x={x + 2} y={y + 4} width={w - 4} height={1} fill={color} opacity={shimmer * 0.6} />
      <rect x={x + 6} y={y + 2} width={Math.min(8, w - 12)} height={1} fill={C.white} opacity={shimmer * 0.5} />
    </g>
  );
};

export const Taxi: React.FC<{x: number; y: number; frame: number; flip?: boolean; color?: string}> = ({
  x,
  y,
  frame,
  flip = false,
  color = '#e7b947',
}) => (
  <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${flip ? -1 : 1} 1)`}>
    <rect x={0} y={0} width={42} height={9} fill={color} />
    <rect x={6} y={-5} width={23} height={6} fill={color} />
    <rect x={9} y={-4} width={7} height={4} fill={C.night3} />
    <rect x={18} y={-4} width={7} height={4} fill={C.night3} />
    <rect x={7} y={-5} width={21} height={1} fill={C.orangeHi} opacity={0.55} />
    <rect x={0} y={4} width={42} height={2} fill={C.orange} opacity={0.25} />
    <rect x={3} y={9} width={6} height={3} fill={C.black} />
    <rect x={32} y={9} width={6} height={3} fill={C.black} />
    <rect x={3} y={-2} width={3} height={2} fill={C.black} opacity={0.4} />
    <rect x={-1} y={2} width={3} height={3} fill={C.white} />
    <rect x={40} y={2} width={3} height={2} fill={C.red} />
    <rect x={17} y={-9} width={8} height={3} fill={C.paper} />
    <rect x={18} y={-8} width={6} height={1} fill={C.black} opacity={0.55} />
    <rect x={0} y={13} width={44} height={3} fill={C.yellow} opacity={0.08} />
    <rect x={4} y={15} width={12} height={1} fill={C.orange} opacity={0.2} />
    <rect x={26} y={14} width={12} height={1} fill={C.cyan} opacity={0.15} />
  </g>
);

export const TrafficLight: React.FC<{x: number; y: number; frame: number; countdown?: boolean}> = ({
  x,
  y,
  frame,
  countdown = false,
}) => {
  const blink = Math.floor(frame / 12) % 2 === 0;
  return (
    <g transform={`translate(${Math.round(x)} ${Math.round(y)})`}>
      <rect x={0} y={-44} width={3} height={46} fill={C.stoneHi} />
      <rect x={-2} y={0} width={7} height={2} fill={C.stone} />
      <rect x={-5} y={-55} width={13} height={17} fill={C.black} />
      <rect x={-4} y={-54} width={11} height={15} fill={C.night1} />
      <rect x={-2} y={-52} width={6} height={4} fill={C.red} opacity={blink ? 1 : 0.35} />
      <rect x={-2} y={-46} width={6} height={4} fill={C.orange} opacity={0.85} />
      <rect x={-2} y={-40} width={6} height={4} fill={C.green} opacity={0.35} />
      {countdown ? (
        <g transform="translate(-10 -34)">
          <rect x={0} y={0} width={23} height={9} fill={C.black} />
          <text x={11.5} y={7} textAnchor="middle" fill={C.cyan} fontFamily={EN_FONT} fontSize={6}>
            {String(Math.max(1, 15 - Math.floor(frame / 8))).padStart(2, '0')}
          </text>
        </g>
      ) : null}
      <rect x={-4} y={-38} width={11} height={1} fill={C.cyan} opacity={0.05} />
    </g>
  );
};

export const StreetBase: React.FC<{
  frame: number;
  pan?: number;
  crosswalk?: boolean;
  warm?: boolean;
}> = ({frame, pan = 0, crosswalk = false, warm = false}) => {
  const t = Math.round(pan);
  return (
    <g transform={`translate(${-t} 0)`}>
      <rect x={-20} y={204} width={W + 40} height={66} fill="#0a1020" />
      <rect x={-20} y={204} width={W + 40} height={3} fill="#35425f" />
      <rect x={-20} y={207} width={W + 40} height={2} fill="#1b2540" />
      <rect x={-20} y={211} width={W + 40} height={23} fill="#19233d" />
      <rect x={-20} y={231} width={W + 40} height={3} fill="#3a4767" />
      <rect x={-20} y={234} width={W + 40} height={36} fill="#0b1020" />
      {crosswalk
        ? Array.from({length: 7}, (_, i) => (
            <g key={i}>
              <rect x={38 + i * 62} y={223} width={26} height={7} fill="#b9c2d2" opacity={0.36} />
              <rect x={43 + i * 62} y={231} width={22} height={8} fill="#9aa6ba" opacity={0.2} />
              <rect x={49 + i * 62} y={240} width={18} height={9} fill="#7e8aa2" opacity={0.13} />
            </g>
          ))
        : [78, 218, 360].map((x, i) => (
            <g key={i}>
              <rect x={x} y={249} width={20} height={2} fill="#c5c08b" opacity={0.25} />
              <rect x={x + 30} y={249} width={14} height={2} fill="#c5c08b" opacity={0.22} />
            </g>
          ))}
      {/* wet reflections */}
      {[60, 130, 210, 292, 370, 440].map((x, i) => (
        <g key={i}>
          <rect
            x={x + Math.sin(frame * 0.04 + i) * 2}
            y={236}
            width={2 + (i % 3)}
            height={12 + (i % 4) * 4}
            fill={i % 2 ? C.cyan : C.orange}
            opacity={0.07}
          />
          <rect x={x + 4} y={240} width={1} height={5} fill={C.magenta} opacity={0.06} />
        </g>
      ))}
      {warm ? <rect x={0} y={204} width={W} height={66} fill={C.orange} opacity={0.035} /> : null}
      <Puddle x={18} y={242} w={74} color={C.cyan} frame={frame} />
      <Puddle x={278} y={236} w={104} color={C.magenta} phase={7} frame={frame} />
      <Puddle x={386} y={252} w={64} color={C.cyan} phase={13} frame={frame} />
      <Rain frame={frame} count={28} top={204} bottom={268} speed={6} opacity={0.16} seed={31} splashY={260} splash />
    </g>
  );
};

export const CityHero: React.FC<{frame: number; duration: number; crowdMode?: boolean; crosswalk?: boolean}> = ({
  frame,
  duration,
  crowdMode = false,
  crosswalk = false,
}) => {
  const t = frame / 24;
  const pan = interpolate(frame, [0, duration], [0, crowdMode ? 10 : 26], {
    easing: Easing.inOut(Easing.quad),
    extrapolateRight: 'clamp',
  });
  const bob = Math.round(Math.sin(t * 1.1) * 1);
  return (
    <g>
      <CitySky frame={frame} pan={pan} rainAmount={crowdMode ? 45 : 90} />
      <g transform={`translate(${Math.round(-pan * 0.52)} ${bob})`}>
        <BuildingLayer
          buildings={midBuildings}
          frame={frame}
          color="#0c1734"
          windowColors={['#e8c777', '#d8b180', '#d8947d', '#9ca98f']}
          parallax={0}
          maxWindows={4}
        />
        <NeonSign x={30} y={104} w={17} h={50} text="夜行" color={C.magenta} vertical frame={frame} size={7} />
        <NeonSign x={92} y={130} w={47} h={15} text="舊電台" color={C.cyan} frame={frame} size={6} />
        <NeonSign x={198} y={100} w={18} h={46} text="唱片" color={C.cyan} vertical frame={frame} size={7} />
        <NeonSign x={265} y={149} w={55} h={14} text="雨具 · 雜貨" color={C.orange} frame={frame} size={5} />
        <NeonSign x={383} y={121} w={16} h={39} text="雨" color={C.magenta} vertical frame={frame} size={8} broken />
        {/* big rooftop billboard: a late-night noodle shop */}
        <g transform="translate(302 82)">
          <rect x={0} y={0} width={86} height={26} fill={C.black} />
          <rect x={1} y={1} width={84} height={24} fill="#1b1712" />
          <rect x={1} y={1} width={84} height={1} fill={C.orange} opacity={0.5} />
          <rect x={1} y={24} width={84} height={1} fill={C.orange} opacity={0.25} />
          <g transform="translate(9 7)">
            <rect x={0} y={4} width={13} height={7} fill={C.orange} opacity={0.8} />
            <rect x={1} y={3} width={11} height={2} fill={C.orangeHi} />
            <rect x={3} y={0} width={1} height={4} fill={C.paper} opacity={0.4} />
            <rect x={8} y={0} width={1} height={4} fill={C.paper} opacity={0.35} />
          </g>
          <text x={30} y={13} fill={C.paper} fontFamily={CN_FONT} fontSize={8}>夜宵</text>
          <text x={30} y={22} fill={C.orangeHi} fontFamily={CN_FONT} fontSize={6}>熱湯麵</text>
          <rect x={78} y={5} width={2} height={2} fill={frame % 34 > 4 ? C.orange : C.orangeHi} />
        </g>
        <rect x={265} y={166} width={104} height={42} fill="#0a1124" />
        <rect x={270} y={171} width={22} height={12} fill={C.cyan} opacity={0.06} />
      </g>
      <StreetBase frame={frame} pan={pan} warm={false} crosswalk={crosswalk} />
      <g transform={`translate(${Math.round(-pan * 0.85)} 0)`}>
        <LampPost x={336} y={231} frame={frame} />
        <LampPost x={48} y={238} frame={frame} scale={0.9} />
        <TrafficLight x={412} y={221} frame={frame} />
        {/* bus shelter */}
        <g transform="translate(4 176)">
          <rect x={0} y={0} width={82} height={40} fill={C.cyan} opacity={0.05} />
          <rect x={0} y={0} width={82} height={2} fill={C.stoneHi} />
          <rect x={0} y={0} width={2} height={41} fill={C.stoneHi} />
          <rect x={80} y={0} width={2} height={41} fill={C.stoneHi} />
          <rect x={8} y={10} width={26} height={17} fill={C.black} opacity={0.7} />
          <rect x={10} y={12} width={22} height={2} fill={C.orange} opacity={0.4} />
          <text x={23} y={23} textAnchor="middle" fontFamily={CN_FONT} fontSize={6} fill={C.orangeHi}>夜班車</text>
          <rect x={14} y={31} width={42} height={3} fill={C.stone} />
          <rect x={18} y={34} width={2} height={7} fill={C.stone} />
        </g>
        <Puddle x={222} y={228} w={38} color={C.orange} frame={frame} />
      </g>
      {/* passing car/light streaks */}
      {!crowdMode ? (
        <>
          <Taxi x={((frame * 2.8 + 120) % 720) - 180} y={240} frame={frame} />
          <rect
            x={((frame * 2.8 + 120) % 720) - 210}
            y={247}
            width={60}
            height={2}
            fill={C.red}
            opacity={0.12}
          />
        </>
      ) : null}
      <Rain frame={frame} count={110} top={0} bottom={268} speed={8} opacity={0.38} seed={3} splashY={255} splash />
    </g>
  );
};
