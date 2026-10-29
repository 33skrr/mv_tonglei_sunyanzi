import React from 'react';
import {C, stepClock} from '../theme';

type GirlProps = {
  x: number;
  y: number;
  frame: number;
  scale?: number;
  flip?: boolean;
  mode?: 'walk' | 'stand' | 'sit' | 'look';
  umbrella?: boolean;
  glow?: boolean;
  opacity?: number;
  headphones?: 'on' | 'neck';
};

/**
 * A 20×43 pixel raincoat girl. Deliberately hand-placed rather than traced:
 * every rect is part of the character's little 8-bit grammar.
 */
export const Girl: React.FC<GirlProps> = ({
  x,
  y,
  frame,
  scale = 1,
  flip = false,
  mode = 'stand',
  umbrella = false,
  glow = false,
  opacity = 1,
  headphones = 'on',
}) => {
  const tick = stepClock(frame, 8);
  const walking = mode === 'walk';
  const bob = walking ? [0, 1, 0, 0, 1, 0][tick % 6] : Math.sin(frame * 0.055) > 0.7 ? 1 : 0;
  const legA = walking ? [0, 2, 3, 1, -1, -2][tick % 6] : 0;
  const legB = walking ? [-1, -2, 0, 2, 3, 1][tick % 6] : 0;
  const armA = walking ? [1, 2, 1, -1, -2, -1][tick % 6] : 0;
  const armB = walking ? [-1, -2, -1, 1, 2, 1][tick % 6] : 0;
  const blink = mode === 'look' ? (frame % 96 > 88 ? 1 : 0) : 0;
  const sit = mode === 'sit';

  const transform = `translate(${Math.round(x)} ${Math.round(y)}) scale(${flip ? -scale : scale} ${scale})`;
  return (
    <g transform={transform} opacity={opacity}>
      {umbrella ? (
        <g transform="translate(2 -22)">
          <rect x={0} y={4} width={28} height={2} fill={C.night0} />
          <rect x={2} y={2} width={24} height={2} fill={C.cyanDim} />
          <rect x={5} y={0} width={18} height={2} fill={C.cyan} opacity={0.85} />
          <rect x={7} y={-1} width={12} height={1} fill={C.cyanHi} opacity={0.8} />
          <rect x={13} y={6} width={1} height={19} fill={C.stoneHi} />
          <rect x={11} y={25} width={4} height={1} fill={C.stoneHi} />
          <rect x={9} y={24} width={2} height={1} fill={C.stoneHi} />
        </g>
      ) : null}

      <g transform={`translate(0 ${bob})`}>
        {/* hood / coat silhouette */}
        {glow ? <rect x={3} y={8} width={13} height={21} fill={C.yellow} opacity={0.1} /> : null}
        <rect x={2} y={8} width={5} height={11} fill={C.yellowDim} />
        <rect x={1} y={10} width={3} height={7} fill={C.yellowDim} />
        <rect x={5} y={10} width={10} height={18} fill={C.yellow} />
        <rect x={5} y={10} width={10} height={3} fill={C.yellowHi} opacity={0.5} />
        <rect x={13} y={11} width={3} height={16} fill={C.yellowDim} />
        <rect x={6} y={26} width={10} height={3} fill={C.yellowDim} />
        <rect x={7} y={28} width={3} height={2} fill={C.yellow} />
        <rect x={12} y={28} width={3} height={2} fill={C.yellow} />
        <rect x={9} y={13} width={1} height={12} fill={C.yellowDim} opacity={0.8} />
        <rect x={11} y={16} width={2} height={1} fill={C.orangeHi} opacity={0.6} />
        <rect x={11} y={20} width={2} height={1} fill={C.orangeHi} opacity={0.45} />
        {/* tote bag + fish pin */}
        <rect x={14} y={12} width={1} height={11} fill={C.hairShadow} />
        <rect x={12} y={22} width={8} height={9} fill={C.paper} />
        <rect x={12} y={22} width={8} height={2} fill={C.blue} />
        <rect x={15} y={26} width={3} height={1} fill={C.cyan} />
        <rect x={17} y={25} width={1} height={1} fill={C.cyan} />
        <rect x={14} y={27} width={1} height={1} fill={C.cyan} />
        {/* legs */}
        {sit ? (
          <>
            <rect x={5} y={28} width={5} height={4} fill={C.hairShadow} />
            <rect x={8} y={31} width={9} height={4} fill={C.hair} />
            <rect x={15} y={33} width={4} height={3} fill={C.hairShadow} />
            <rect x={16} y={35} width={4} height={2} fill={C.red} />
            <rect x={3} y={28} width={4} height={5} fill={C.hair} />
            <rect x={1} y={30} width={1} height={2} fill={C.hairShadow} />
          </>
        ) : (
          <>
            <rect x={5} y={28} width={4} height={9} fill={C.hair} />
            <rect x={10} y={28} width={4} height={9} fill={C.hairShadow} />
            <g transform={`translate(${legA} 0)`}>
              <rect x={4} y={28} width={4} height={9} fill={C.hairShadow} />
              <rect x={3} y={36} width={6} height={4} fill={C.red} />
              <rect x={3} y={39} width={6} height={1} fill={C.hairShadow} />
            </g>
            <g transform={`translate(${legB} 0)`}>
              <rect x={10} y={28} width={4} height={9} fill={C.hair} />
              <rect x={10} y={36} width={6} height={4} fill={C.red} />
              <rect x={10} y={39} width={6} height={1} fill={C.hairShadow} />
            </g>
          </>
        )}
        {/* coat arm */}
        <g transform={`translate(${sit ? -1 : armA} ${sit ? 2 : 0})`}>
          <rect x={4} y={14} width={3} height={9} fill={C.yellowDim} />
          <rect x={4} y={21} width={3} height={3} fill={C.skin} />
          <rect x={5} y={23} width={2} height={2} fill={C.skinShadow} />
        </g>
        <g transform={`translate(${sit ? -2 : armB} 0)`}>
          <rect x={12} y={15} width={3} height={8} fill={C.yellow} />
          <rect x={13} y={22} width={3} height={3} fill={C.skin} />
        </g>
        {/* head */}
        <rect x={4} y={1} width={11} height={9} fill={C.hair} />
        <rect x={5} y={0} width={8} height={2} fill={C.hairHi} />
        <rect x={3} y={3} width={3} height={9} fill={C.hair} />
        <rect x={4} y={6} width={2} height={6} fill={C.hairHi} opacity={0.65} />
        <rect x={12} y={3} width={4} height={7} fill={C.skin} />
        <rect x={14} y={4} width={2} height={5} fill={C.skinHi} />
        <rect x={15} y={6} width={1} height={2} fill={C.skinShadow} />
        <rect x={12} y={9} width={3} height={2} fill={C.skinShadow} />
        <rect x={9} y={3} width={4} height={2} fill={C.hairShadow} />
        <rect x={12} y={4} width={1} height={1} fill={C.hairShadow} />
        {/* headphone */}
        {headphones === 'on' ? (
          <>
            <rect x={4} y={1} width={9} height={1} fill={C.cyanDim} />
            <rect x={4} y={2} width={1} height={2} fill={C.cyanDim} />
            <rect x={6} y={4} width={4} height={5} fill={C.cyan} />
            <rect x={7} y={4} width={2} height={4} fill={C.cyanHi} opacity={0.55} />
            <rect x={8} y={5} width={1} height={1} fill={C.night0} />
            {glow ? <rect x={6} y={4} width={1} height={1} fill={C.cyanHi} /> : null}
          </>
        ) : null}
        {/* face, found in a sliver of hair */}
        {blink ? (
          <rect x={12} y={6} width={2} height={1} fill={C.hairShadow} />
        ) : (
          <>
            <rect x={12} y={6} width={2} height={2} fill={C.night0} />
            <rect x={13} y={6} width={1} height={1} fill={C.cyanHi} opacity={0.9} />
          </>
        )}
        <rect x={15} y={7} width={1} height={1} fill={C.skinShadow} opacity={0.8} />
        <rect x={14} y={9} width={2} height={1} fill="#b87463" opacity={0.8} />
        <rect x={12} y={4} width={2} height={1} fill={C.hairShadow} />
        {/* headphones resting around the neck */}
        {headphones === 'neck' ? (
          <g>
            <rect x={5} y={12} width={10} height={2} fill={C.cyanDim} />
            <rect x={4} y={13} width={4} height={5} fill={C.cyan} />
            <rect x={12} y={13} width={4} height={5} fill={C.cyanDim} />
            <rect x={5} y={14} width={2} height={3} fill={C.cyanHi} opacity={0.5} />
            <rect x={13} y={15} width={1} height={1} fill={C.cyanHi} opacity={0.7} />
            <path d="M 15 16 L 17 21 L 17 25" fill="none" stroke={C.cyanDim} strokeWidth={1} />
          </g>
        ) : null}
        {/* rain beads */}
        <rect x={6} y={4} width={1} height={1} fill={C.cyanHi} opacity={0.6} />
        <rect x={14} y={10} width={1} height={1} fill={C.cyan} opacity={0.8} />
      </g>
    </g>
  );
};

type BoyProps = {
  x: number;
  y: number;
  frame: number;
  scale?: number;
  flip?: boolean;
  mode?: 'stand' | 'sit' | 'walk';
  opacity?: number;
  glow?: boolean;
};

export const Boy: React.FC<BoyProps> = ({
  x,
  y,
  frame,
  scale = 1,
  flip = false,
  mode = 'stand',
  opacity = 1,
  glow = false,
}) => {
  const bob = mode === 'walk' ? [0, 1, 0, 0, 1, 0][stepClock(frame, 8) % 6] : Math.sin(frame * 0.05 + 1.5) > 0.75 ? 1 : 0;
  const tick = stepClock(frame, 8);
  const legA = mode === 'walk' ? [1, 2, 0, -1, -2, 0][tick % 6] : 0;
  const legB = mode === 'walk' ? [-1, -2, 0, 1, 2, 0][tick % 6] : 0;
  const blink = frame % 116 > 108;
  const sit = mode === 'sit';
  return (
    <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${flip ? -scale : scale} ${scale})`} opacity={opacity}>
      {glow ? <rect x={3} y={10} width={15} height={20} fill={C.cyan} opacity={0.06} /> : null}
      <g transform={`translate(0 ${bob})`}>
        {/* legs */}
        {sit ? (
          <>
            <rect x={5} y={27} width={6} height={5} fill={C.hairShadow} />
            <rect x={9} y={29} width={13} height={4} fill={C.night2} />
            <rect x={20} y={31} width={4} height={7} fill={C.night2} />
            <rect x={20} y={36} width={6} height={3} fill={C.paper} />
            <rect x={25} y={38} width={2} height={1} fill={C.stoneHi} />
            <rect x={5} y={27} width={5} height={5} fill={C.night2} />
            <rect x={1} y={29} width={5} height={4} fill={C.hairShadow} />
            <rect x={1} y={32} width={3} height={2} fill={C.cyanDim} />
          </>
        ) : (
          <>
            <rect x={6} y={27} width={4} height={11} fill={C.hairShadow} />
            <rect x={11} y={27} width={4} height={11} fill={C.night2} />
            <g transform={`translate(${legA} 0)`}>
              <rect x={5} y={27} width={4} height={10} fill={C.night2} />
              <rect x={4} y={36} width={6} height={3} fill={C.paper} />
              <rect x={4} y={38} width={6} height={1} fill={C.stoneHi} />
            </g>
            <g transform={`translate(${legB} 0)`}>
              <rect x={11} y={27} width={4} height={10} fill={C.hairShadow} />
              <rect x={10} y={36} width={6} height={3} fill={C.cyanDim} />
              <rect x={10} y={38} width={6} height={1} fill={C.hairShadow} />
            </g>
          </>
        )}
        {/* jacket */}
        <rect x={4} y={11} width={15} height={18} fill={C.teal} />
        <rect x={4} y={11} width={4} height={17} fill={C.cyanDim} opacity={0.8} />
        <rect x={15} y={12} width={4} height={16} fill={C.night2} />
        <rect x={8} y={13} width={1} height={12} fill={C.cyan} opacity={0.4} />
        <rect x={11} y={20} width={4} height={1} fill={C.cyanHi} opacity={0.5} />
        {/* scarf */}
        <rect x={5} y={11} width={12} height={2} fill={C.red} />
        <rect x={14} y={13} width={2} height={5} fill={C.red} />
        <rect x={15} y={16} width={2} height={3} fill={C.magentaDim} />
        {/* tote / radio */}
        <rect x={14} y={21} width={6} height={7} fill={C.stone} />
        <rect x={15} y={22} width={4} height={2} fill={C.cyanDim} />
        <rect x={16} y={25} width={2} height={1} fill={C.cyan} />
        <rect x={14} y={21} width={1} height={6} fill={C.hairShadow} />
        {/* arm */}
        <rect x={4} y={14} width={3} height={8} fill={C.teal} />
        <rect x={3} y={21} width={4} height={3} fill={C.skinShadow} />
        <rect x={16} y={14} width={3} height={8} fill={C.cyanDim} />
        <rect x={16} y={21} width={3} height={2} fill={C.skin} />
        {/* neck/head */}
        <rect x={9} y={9} width={5} height={4} fill={C.skinShadow} />
        <rect x={5} y={1} width={12} height={9} fill={C.skin} />
        <rect x={5} y={0} width={12} height={3} fill={C.hair} />
        <rect x={4} y={1} width={3} height={6} fill={C.hair} />
        <rect x={16} y={2} width={2} height={5} fill={C.hairShadow} />
        <rect x={13} y={3} width={4} height={2} fill={C.skinHi} />
        <rect x={6} y={4} width={8} height={1} fill={C.hairShadow} />
        {/* headphones */}
        <rect x={4} y={1} width={12} height={1} fill={C.orange} />
        <rect x={4} y={2} width={1} height={3} fill={C.orange} />
        <rect x={5} y={4} width={4} height={5} fill={C.orange} />
        <rect x={6} y={5} width={2} height={3} fill={C.orangeHi} opacity={0.6} />
        <rect x={7} y={5} width={1} height={1} fill={C.night0} />
        {/* face */}
        {blink ? (
          <rect x={13} y={6} width={2} height={1} fill={C.hairShadow} />
        ) : (
          <>
            <rect x={13} y={5} width={1} height={2} fill={C.night0} />
            <rect x={14} y={5} width={1} height={1} fill={C.cyanHi} />
          </>
        )}
        <rect x={13} y={8} width={2} height={1} fill={C.skinShadow} />
        {/* the same little fish, on his wrist */}
        {glow ? (
          <g transform="translate(17 20)">
            <rect x={0} y={1} width={2} height={1} fill={C.cyan} />
            <rect x={1} y={0} width={2} height={3} fill={C.cyan} />
            <rect x={2} y={1} width={1} height={1} fill={C.night0} />
          </g>
        ) : null}
      </g>
    </g>
  );
};

export const CrowdFigure: React.FC<{
  x: number;
  y: number;
  frame: number;
  scale?: number;
  color?: string;
  umbrellaColor?: string;
  speed?: number;
  phase?: number;
  opacity?: number;
}> = ({x, y, frame, scale = 1, color = '#0a0d1a', umbrellaColor = C.night1, speed = 1, phase = 0, opacity = 0.9}) => {
  const walk = Math.sin(frame * 0.12 * speed + phase);
  const bob = Math.round(walk * 0.8);
  return (
    <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${scale})`} opacity={opacity}>
      <g transform={`translate(0 ${bob})`}>
        <rect x={-8} y={-22} width={19} height={3} fill={umbrellaColor} />
        <rect x={-6} y={-24} width={15} height={2} fill={umbrellaColor} />
        <rect x={-3} y={-25} width={9} height={1} fill={umbrellaColor} />
        <rect x={-5} y={-24} width={12} height={1} fill="#5b6e94" opacity={0.55} />
        <rect x={-2} y={-22} width={7} height={1} fill="#7d91b5" opacity={0.4} />
        <rect x={0} y={-20} width={1} height={23} fill={C.stone} />
        <rect x={-1} y={-10} width={6} height={13} fill={color} />
        <rect x={-2} y={-9} width={2} height={9} fill={color} />
        <rect x={4} y={-9} width={2} height={8} fill={color} />
        <rect x={-2} y={3} width={2} height={6} fill={color} />
        <rect x={2} y={3} width={3} height={6} fill={color} />
        <rect x={-3} y={8} width={5} height={2} fill={C.black} />
        <rect x={2} y={8} width={5} height={2} fill={C.black} />
        <rect x={-2} y={-16} width={7} height={7} fill={color} />
        <rect x={-1} y={-14} width={5} height={3} fill={C.night3} opacity={0.45} />
      </g>
    </g>
  );
};

export const Cat: React.FC<{x: number; y: number; frame: number; scale?: number; color?: string}> = ({
  x,
  y,
  frame,
  scale = 1,
  color = C.black,
}) => {
  const tail = stepClock(frame, 4) % 4;
  return (
    <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${scale})`}>
      <rect x={0} y={8} width={12} height={5} fill={color} />
      <rect x={8} y={3} width={6} height={7} fill={color} />
      <rect x={8} y={1} width={2} height={3} fill={color} />
      <rect x={12} y={1} width={2} height={3} fill={color} />
      <rect x={8} y={2} width={1} height={1} fill={C.magenta} />
      <rect x={13} y={2} width={1} height={1} fill={C.magenta} />
      <rect x={9} y={11} width={2} height={4} fill={color} />
      <rect x={12} y={11} width={2} height={4} fill={color} />
      <rect x={-1} y={9} width={2} height={5} fill={color} />
      <rect
        x={-6}
        y={[14, 12, 10, 12][tail]}
        width={6}
        height={2}
        fill={color}
        transform={`rotate(${[-20, -5, 15, 0][tail]} -1 10)`}
      />
    </g>
  );
};

const CraneShape: React.FC<{color: string}> = ({color}) => (
  <>
    <rect x={5} y={6} width={8} height={5} fill={color} />
    <rect x={2} y={3} width={6} height={4} fill={color} />
    <rect x={10} y={3} width={7} height={5} fill={color} />
    <rect x={7} y={2} width={4} height={3} fill={color} />
    <rect x={13} y={5} width={6} height={1} fill={color} />
    <rect x={17} y={4} width={2} height={2} fill={color} />
    <rect x={3} y={7} width={2} height={1} fill={C.cyanHi} opacity={0.6} />
    <rect x={8} y={8} width={1} height={1} fill={C.cyanDim} opacity={0.55} />
    <rect x={-1} y={8} width={5} height={1} fill={color} opacity={0.75} />
    <rect x={1} y={9} width={2} height={1} fill={color} opacity={0.45} />
  </>
);

export const PaperCrane: React.FC<{
  x: number;
  y: number;
  frame: number;
  scale?: number;
  color?: string;
  glow?: boolean;
  opacity?: number;
}> = ({x, y, frame, scale = 1, color = C.paper, opacity = 1}) => {
  return (
    <g transform={`translate(${Math.round(x)} ${Math.round(y)}) scale(${scale})`} opacity={opacity}>
      <g transform="translate(1.2 1.2)" opacity={0.35}>
        <CraneShape color={C.black} />
      </g>
      <CraneShape color={color} />
    </g>
  );
};

export const UmbrellaGirl: React.FC<{
  x: number;
  y: number;
  frame: number;
  scale?: number;
  flip?: boolean;
}> = (props) => <Girl {...props} umbrella mode="walk" />;
