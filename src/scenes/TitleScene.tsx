import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, H, W} from '../theme';
import {Cloud, Moon, Rain, SceneSvg, StarField} from '../components/Primitives';
import {PaperCrane} from '../components/Characters';

const silhouette = [
  {x: -10, w: 58, h: 44},
  {x: 42, w: 36, h: 63},
  {x: 72, w: 52, h: 30},
  {x: 118, w: 44, h: 54},
  {x: 158, w: 62, h: 36},
  {x: 214, w: 40, h: 66},
  {x: 248, w: 74, h: 42},
  {x: 316, w: 32, h: 56},
  {x: 344, w: 64, h: 31},
  {x: 402, w: 42, h: 48},
  {x: 438, w: 60, h: 72},
];

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = frame > 20 ? 1 : 0;
  return (
    <SceneSvg>
      <rect width={W} height={H} fill={C.black} />
      {['#05060f', '#070a16', '#090d1e', '#0b1127', '#0d142c', '#101a34'].map((color, i) => (
        <rect key={i} x={0} y={i * 32} width={W} height={34} fill={color} />
      ))}
      <StarField frame={frame} count={110} seed={44} top={0} height={200} opacity={0.9} />
      <Moon x={382} y={24} scale={2} />
      <g opacity={0.8}>
        <Cloud x={20 + ((frame * 0.04) % 40)} y={52} scale={0.75} color="#111a35" opacity={0.7} />
        <Cloud x={270 + ((frame * 0.025) % 90)} y={80} scale={1.1} color="#0e1630" opacity={0.55} />
      </g>
      {/* the sleeping city is only a dark rim here */}
      {silhouette.map((b, i) => {
        const top = 218 - b.h;
        return (
          <g key={i}>
            <rect x={b.x} y={top} width={b.w} height={b.h + 20} fill="#060a16" />
            {i % 2 === 0 ? <rect x={b.x + 6} y={top - 5} width={1} height={5} fill="#060a16" /> : null}
            {Array.from({length: Math.min(7, Math.floor(b.w / 9))}, (_, j) => (
              <rect
                key={j}
                x={b.x + 5 + j * 8}
                y={top + 7 + ((i + j * 3) % 4) * 7}
                width={2}
                height={2}
                fill={i % 3 === 0 && j % 2 === 0 ? C.orange : C.cyan}
                opacity={0.24 + ((i + j) % 3) * 0.12}
              />
            ))}
          </g>
        );
      })}
      <rect x={0} y={218} width={W} height={3} fill="#0c1429" />
      <rect x={0} y={221} width={W} height={49} fill="#03050d" />
      {Array.from({length: 22}, (_, i) => (
        <rect
          key={i}
          x={12 + i * 21}
          y={224 + (i % 5) * 7}
          width={i % 5 === 0 ? 6 : 2}
          height={1}
          fill={i % 4 === 0 ? C.cyan : C.cyanDim}
          opacity={0.1 + (i % 3) * 0.05}
        />
      ))}
      {/* a windowsill: the real, small world under the city */}
      <g>
        <rect x={0} y={236} width={188} height={34} fill="#0c0d11" />
        <rect x={0} y={236} width={188} height={3} fill="#34302c" />
        <rect x={0} y={239} width={188} height={2} fill="#1b1917" />
        <rect x={0} y={268} width={188} height={2} fill={C.black} />
        <PaperCrane x={30} y={219} frame={frame} scale={1.55} color={C.paper} glow={false} />
        <g transform="translate(102 224)">
          <rect x={0} y={2} width={13} height={11} fill="#4c3b31" />
          <rect x={1} y={2} width={11} height={1} fill="#8e7563" opacity={0.6} />
          <rect x={13} y={5} width={2} height={4} fill="#4c3b31" />
        </g>
        <g transform="translate(137 228)">
          <rect x={0} y={0} width={22} height={14} fill="#181512" />
          <rect x={2} y={2} width={18} height={8} fill="#2a231c" />
          <circle cx={7} cy={6} r={2} fill="#0b0907" />
          <circle cx={15} cy={6} r={2} fill="#0b0907" />
          <rect x={2} y={11} width={11} height={1} fill={C.paper} opacity={0.35} />
        </g>
        <rect x={20} y={258} width={31} height={1} fill={C.orange} opacity={0.12} />
        <rect x={64} y={262} width={44} height={1} fill={C.cyan} opacity={0.08} />
      </g>
      <Rain frame={frame} count={95} top={0} bottom={270} speed={5} opacity={0.22} seed={71} />
      <rect x={0} y={0} width={W} height={H} fill={C.black} opacity={frame < 3 ? 1 : 0} />
      <rect x={0} y={134} width={W} height={2} fill={C.paper} opacity={reveal ? 0 : 0.7} />
    </SceneSvg>
  );
};
