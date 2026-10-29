import React, {useMemo} from 'react';
import {AbsoluteFill, staticFile, useCurrentFrame} from 'remotion';
import {C, CN_FONT, EN_FONT, H, W, mulberry32} from '../theme';

export const SVGProps = {
  viewBox: `0 0 ${W} ${H}`,
  width: '100%',
  height: '100%',
  preserveAspectRatio: 'xMidYMid slice',
  shapeRendering: 'crispEdges' as const,
  style: {
    position: 'absolute' as const,
    inset: 0,
    imageRendering: 'pixelated' as const,
    filter: 'saturate(0.9) contrast(1.03) brightness(1.06)',
  },
};

export const SceneSvg: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({children, style}) => (
  <svg {...SVGProps} style={{...SVGProps.style, ...style}}>
    {children}
  </svg>
);

export const Dither: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  opacity?: number;
  density?: 2 | 4;
  id: string;
}> = ({x, y, w, h, color, opacity = 1, density = 2, id}) => (
  <>
    <defs>
      <pattern id={id} width={density} height={density} patternUnits="userSpaceOnUse">
        <rect width={1} height={1} fill={color} />
        <rect x={density === 4 ? 2 : 0} y={1} width={1} height={1} fill={color} />
      </pattern>
    </defs>
    <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} opacity={opacity} />
  </>
);

export const PixelGlow: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  strength?: number;
  step?: number;
}> = ({x, y, w, h, color, strength = 0.08, step = 3}) => (
  <g>
    {[3, 2, 1].map((ring) => (
      <rect
        key={ring}
        x={x - ring * step}
        y={y - ring * step}
        width={w + ring * step * 2}
        height={h + ring * step * 2}
        fill={color}
        opacity={strength * (0.7 + ring * 0.2)}
      />
    ))}
  </g>
);

export const StarField: React.FC<{
  frame: number;
  count?: number;
  seed?: number;
  top?: number;
  height?: number;
  opacity?: number;
  bright?: boolean;
}> = ({frame, count = 70, seed = 4, top = 0, height = 150, opacity = 1, bright = true}) => {
  const stars = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({length: count}, () => ({
      x: Math.floor(rand() * W),
      y: Math.floor(top + rand() * height),
      s: rand() > 0.9 ? 2 : 1,
      phase: rand() * 30,
      speed: 0.02 + rand() * 0.05,
      cyan: rand() > 0.78,
    }));
  }, [count, seed, top, height]);

  return (
    <g opacity={opacity}>
      {stars.map((star, i) => {
        const shimmer = 0.35 + 0.65 * Math.abs(Math.sin(frame * star.speed + star.phase));
        return (
          <rect
            key={i}
            x={star.x}
            y={star.y}
            width={star.s}
            height={star.s}
            fill={star.cyan ? C.cyan : bright ? C.white : C.blueHi}
            opacity={shimmer}
          />
        );
      })}
    </g>
  );
};

export const Rain: React.FC<{
  frame: number;
  count?: number;
  seed?: number;
  top?: number;
  bottom?: number;
  angle?: number;
  speed?: number;
  opacity?: number;
  color?: string;
  splashY?: number;
  splash?: boolean;
}> = ({
  frame,
  count = 80,
  seed = 2,
  top = 0,
  bottom = H,
  angle = -2,
  speed = 7,
  opacity = 0.5,
  color = '#9fc8f4',
  splashY,
  splash = false,
}) => {
  const drops = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({length: count}, () => ({
      x: rand() * (W + 120) - 60,
      y: rand() * (bottom - top + 40),
      len: 2 + Math.floor(rand() * 7),
      sf: 0.55 + rand() * 1.3,
      w: rand() > 0.8 ? 0.8 : 0.35,
      phase: rand() * 40,
      cyan: rand() > 0.72,
    }));
  }, [count, seed, top, bottom]);

  const span = bottom - top + 30;
  const splashes = useMemo(() => {
    if (!splash || splashY === undefined) return [];
    const rand = mulberry32(seed + 100);
    return Array.from({length: 16}, () => ({
      x: rand() * W,
      phase: rand() * 16,
      size: rand() > 0.5 ? 2 : 1,
    }));
  }, [seed, splash, splashY]);

  return (
    <g opacity={opacity}>
      {drops.map((drop, i) => {
        const travel = (drop.y + frame * speed * drop.sf) % span;
        const y = top + travel;
        const x = ((drop.x + travel * 0.14) % (W + 100)) - 50;
        return (
          <line
            key={i}
            x1={Math.round(x)}
            y1={Math.round(y)}
            x2={Math.round(x + angle)}
            y2={Math.round(y + drop.len)}
            stroke={drop.cyan ? C.cyan : color}
            strokeWidth={drop.w}
            opacity={0.55 + drop.w * 0.4}
          />
        );
      })}
      {splashes.map((s, i) => {
        const phase = (frame + s.phase) % 16;
        const alpha = phase < 4 ? 0.65 : Math.max(0, 0.45 - phase * 0.035);
        return (
          <g key={i} opacity={alpha}>
            <rect x={Math.round(s.x)} y={splashY!} width={s.size} height={1} fill={color} />
            <rect x={Math.round(s.x) - 2} y={splashY! - 1} width={1} height={1} fill={color} />
            <rect x={Math.round(s.x) + 2} y={splashY! - 2} width={1} height={1} fill={color} />
          </g>
        );
      })}
    </g>
  );
};

const FISH_MATRIX = [
  '..#...#####.....',
  '.###.#######....',
  '#############...',
  '###############.',
  '#############...',
  '.###.#######....',
  '..#...#####.....',
];

export const FishSprite: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color?: string;
  eye?: string;
  opacity?: number;
  flip?: boolean;
  glow?: boolean;
}> = ({x, y, scale = 1, color = C.cyan, eye = C.night0, opacity = 1, flip = false, glow = true}) => {
  const cells: React.ReactNode[] = [];
  FISH_MATRIX.forEach((row, ry) => {
    row.split('').forEach((ch, rx) => {
      if (ch !== '#') return;
      cells.push(
        <rect key={`${rx}-${ry}`} x={rx} y={ry} width={1} height={1} fill={color} />,
      );
    });
  });
  return (
    <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${flip ? -scale : scale} ${scale})`} opacity={opacity}>
      {glow ? (
        <g opacity={0.16}>
          {[-1, 0, 1].map((ox) =>
            [-1, 0, 1].map((oy) => (
              <g key={`${ox}-${oy}`} transform={`translate(${ox} ${oy})`}>
                {cells}
              </g>
            )),
          )}
        </g>
      ) : null}
      {cells}
      <rect x={11} y={2} width={1} height={1} fill={eye} />
    </g>
  );
};
export const PixelLabel: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  font?: 'cn' | 'en';
  anchor?: 'start' | 'middle' | 'end';
  opacity?: number;
  shadow?: boolean;
  letterSpacing?: number;
  transform?: string;
}> = ({
  x,
  y,
  children,
  size = 6,
  color = C.white,
  font = 'cn',
  anchor = 'start',
  opacity = 1,
  shadow = true,
  letterSpacing = 0,
  transform,
}) => (
  <text
    x={x}
    y={y}
    fill={color}
    fontFamily={font === 'cn' ? CN_FONT : EN_FONT}
    fontSize={size}
    textAnchor={anchor}
    opacity={opacity}
    letterSpacing={letterSpacing}
    transform={transform}
    style={shadow ? {paintOrder: 'stroke', stroke: C.black, strokeWidth: 1} : undefined}
  >
    {children}
  </text>
);

export const Cloud: React.FC<{
  x: number;
  y: number;
  scale?: number;
  color?: string;
  opacity?: number;
}> = ({x, y, scale = 1, color = C.night3, opacity = 0.9}) => (
  <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${scale})`} opacity={opacity}>
    <rect x={0} y={8} width={52} height={7} fill={color} />
    <rect x={7} y={4} width={37} height={6} fill={color} />
    <rect x={13} y={1} width={21} height={5} fill={color} />
    <rect x={23} y={0} width={7} height={2} fill={color} />
    <rect x={3} y={15} width={43} height={2} fill={color} opacity={0.6} />
  </g>
);

const MOON_ROWS = [
  '...#####....',
  '..#######...',
  '.#########..',
  '########....',
  '#######.....',
  '######......',
  '######......',
  '#######.....',
  '########....',
  '.#########..',
  '..#######...',
  '...#####....',
];

export const Moon: React.FC<{x: number; y: number; scale?: number; color?: string; halo?: string}> = ({
  x,
  y,
  scale = 2,
  color = C.paper,
  halo = C.cyan,
}) => {
  const cells: React.ReactNode[] = [];
  MOON_ROWS.forEach((row, ry) => {
    row.split('').forEach((ch, rx) => {
      if (ch !== '#') return;
      const crater = (rx === 3 && ry === 3) || (rx === 4 && ry === 7) || (rx === 2 && ry === 6);
      cells.push(
        <rect
          key={`${rx}-${ry}`}
          x={rx}
          y={ry}
          width={1}
          height={1}
          fill={crater ? '#c7b997' : color}
        />,
      );
    });
  });
  return (
    <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${scale})`}>
      {/* a sparse pixel halo instead of a box */}
      {[
        [-5, 3], [-5, 7], [-4, 11], [2, -4], [7, -4], [10, -2],
        [15, 3], [16, 7], [14, 13], [10, 15], [2, 15], [-3, 13],
      ].map(([hx, hy], i) => (
        <rect key={i} x={hx} y={hy} width={1} height={1} fill={halo} opacity={i % 3 === 0 ? 0.18 : 0.1} />
      ))}
      {cells}
      <rect x={3} y={11} width={5} height={1} fill={C.orange} opacity={0.25} />
    </g>
  );
};

export const MusicNote: React.FC<{
  x: number;
  y: number;
  color?: string;
  scale?: number;
  opacity?: number;
}> = ({x, y, color = C.cyan, scale = 1, opacity = 1}) => (
  <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${scale})`} fill={color} opacity={opacity}>
    <rect x={3} y={0} width={1} height={7} fill={color} />
    <rect x={4} y={0} width={3} height={1} fill={color} />
    <rect x={5} y={5} width={3} height={2} fill={color} />
  </g>
);

export const Sparkle: React.FC<{
  x: number;
  y: number;
  frame: number;
  color?: string;
  phase?: number;
  size?: number;
}> = ({x, y, frame, color = C.cyanHi, phase = 0, size = 1}) => {
  const p = (frame * 0.09 + phase) % (Math.PI * 2);
  const alpha = Math.max(0, Math.sin(p));
  if (alpha < 0.08) return null;
  return (
    <g opacity={alpha}>
      <rect x={Math.round(x)} y={Math.round(y)} width={size} height={size} fill={color} />
      <rect x={Math.round(x) - size} y={Math.round(y)} width={size} height={size} fill={color} opacity={0.5} />
      <rect x={Math.round(x) + size} y={Math.round(y)} width={size} height={size} fill={color} opacity={0.5} />
      <rect x={Math.round(x)} y={Math.round(y) - size} width={size} height={size} fill={color} opacity={0.5} />
      <rect x={Math.round(x)} y={Math.round(y) + size} width={size} height={size} fill={color} opacity={0.5} />
    </g>
  );
};

export const ScanlineOverlay: React.FC<{strength?: number; opacity?: number}> = ({strength = 4, opacity = 0.12}) => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      opacity,
      backgroundImage: `repeating-linear-gradient(to bottom, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent ${strength}px)`,
      zIndex: 40,
    }}
  />
);

export const CrtOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = ((frame * 2) % 128) - 128;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 41}}>
      <AbsoluteFill
        style={{
          mixBlendMode: 'soft-light',
          opacity: 0.028,
          backgroundImage: `url(${staticFile('noise.png')})`,
          backgroundSize: '96px 96px',
          backgroundPosition: `${offset}px ${offset / 2}px`,
        }}
      />
      <AbsoluteFill
        style={{
          mixBlendMode: 'soft-light',
          background: 'rgba(158, 105, 58, 0.08)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 46%, transparent 54%, rgba(14,10,9,0.12) 80%, rgba(12,8,7,0.38) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 170px rgba(18,11,8,0.36)',
        }}
      />
    </AbsoluteFill>
  );
};

export const Hud: React.FC<{label: string; opacity?: number}> = ({label, opacity = 0.72}) => {
  const frame = useCurrentFrame();
  const total = 5105;
  const seconds = frame / 24;
  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = Math.floor(seconds % 60).toString().padStart(2, '0');
  const ff = Math.floor((seconds % 1) * 24).toString().padStart(2, '0');
  const blink = Math.floor(frame / 12) % 2 === 0;
  return (
    <AbsoluteFill style={{zIndex: 45, pointerEvents: 'none', padding: 46, color: '#e8f6ee'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: EN_FONT, fontSize: 15, opacity}}>
        <div style={{letterSpacing: 1}}>
          KINDRED<span style={{color: C.cyan}}> / </span>8-BIT
          <div style={{fontSize: 11, marginTop: 11, color: C.cyan, opacity: 0.8}}>A FAN-MADE PIXEL FABLE</div>
        </div>
        <div style={{textAlign: 'right', letterSpacing: 1}}>
          {label}
          <div style={{fontSize: 11, marginTop: 11, color: C.magenta, opacity: 0.9}}>
            <span style={{opacity: blink ? 1 : 0.25}}>●</span> REC / 88.7 MHz
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 46,
          right: 46,
          bottom: 38,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontFamily: EN_FONT,
          fontSize: 12,
          opacity: opacity * 0.8,
        }}
      >
        <div>
          TC 00:{mm}:{ss}:{ff} / 03:32:17
        </div>
        <div style={{color: C.cyan}}>STEREO<span style={{color: '#e8f6ee'}}> · 24 FPS</span></div>
      </div>
      {[
        {top: 22, left: 22, borderTop: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}`},
        {top: 22, right: 22, borderTop: `2px solid ${C.cyan}`, borderRight: `2px solid ${C.cyan}`},
        {bottom: 22, left: 22, borderBottom: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}`},
        {bottom: 22, right: 22, borderBottom: `2px solid ${C.cyan}`, borderRight: `2px solid ${C.cyan}`},
      ].map((b, i) => (
        <div key={i} style={{position: 'absolute', width: 24, height: 24, ...b, opacity: 0.65}} />
      ))}
    </AbsoluteFill>
  );
};

export const GlitchBars: React.FC<{frame: number; strength?: number}> = ({frame, strength = 1}) => {
  const bars = useMemo(() => {
    const rand = mulberry32(993);
    return Array.from({length: 8}, () => ({
      y: rand() * 1080,
      h: 2 + rand() * 10,
      off: rand() * 60 - 30,
      w: 200 + rand() * 1000,
      color: rand() > 0.5 ? C.cyan : C.magenta,
    }));
  }, []);
  if (strength <= 0) return null;
  return (
    <AbsoluteFill style={{zIndex: 44, pointerEvents: 'none', opacity: strength}}>
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: b.y,
            left: i % 2 ? 0 : undefined,
            right: i % 2 ? undefined : 0,
            width: b.w,
            height: b.h,
            background: b.color,
            opacity: 0.16,
            transform: `translateX(${b.off * strength}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
