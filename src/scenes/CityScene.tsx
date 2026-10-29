import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp01} from '../theme';
import {CityHero} from '../components/Cityscape';
import {Cat, CrowdFigure, Girl} from '../components/Characters';
import {NeonSign, TrafficLight} from '../components/Cityscape';
import {Rain, SceneSvg} from '../components/Primitives';

export const CityScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const girlX = 104 + frame * 0.34;
  const girlY = 202 + (Math.floor(frame / 12) % 2);
  return (
    <SceneSvg>
      <CityHero frame={frame} duration={duration} />
      <Cat x={66} y={163} frame={frame} scale={0.75} color="#070a14" />
      <g opacity={0.11}>
        <g transform="translate(0 490) scale(1 -1)">
          <Girl x={girlX} y={girlY} frame={frame} mode="walk" />
        </g>
      </g>
      <Girl x={girlX} y={girlY} frame={frame} mode="walk" />
      <Rain frame={frame} count={54} top={130} bottom={270} speed={9} opacity={0.28} seed={54} splashY={252} />
      {/* a second taxi leaving a red streak */}
      <rect
        x={((frame * 4.2 + 460) % 760) - 200}
        y={255}
        width={54}
        height={1}
        fill={C.magenta}
        opacity={0.18}
      />
    </SceneSvg>
  );
};

const crowdSeed = [
  {x: -60, y: 196, dir: 1, spd: 1.7, scale: 0.8, um: '#111a2f', op: 0.55},
  {x: 50, y: 194, dir: 1, spd: 1.2, scale: 0.8, um: '#172541', op: 0.55},
  {x: 190, y: 196, dir: 1, spd: 1.9, scale: 0.8, um: '#0c1325', op: 0.5},
  {x: 330, y: 193, dir: 1, spd: 1.5, scale: 0.8, um: '#19223a', op: 0.55},
  {x: 430, y: 197, dir: 1, spd: 1.25, scale: 0.8, um: '#101a30', op: 0.5},
  {x: 540, y: 195, dir: 1, spd: 1.8, scale: 0.8, um: '#1b2947', op: 0.55},
  {x: 20, y: 211, dir: 1, spd: 2.2, scale: 0.93, um: '#0b1324', op: 0.72},
  {x: 140, y: 210, dir: 1, spd: 1.8, scale: 0.93, um: '#24365a', op: 0.7},
  {x: 372, y: 212, dir: 1, spd: 2.6, scale: 0.93, um: '#0e172d', op: 0.75},
  {x: 474, y: 210, dir: 1, spd: 1.6, scale: 0.93, um: '#15213b', op: 0.7},
  {x: 600, y: 211, dir: 1, spd: 2.1, scale: 0.93, um: '#0c1426', op: 0.7},
  {x: -100, y: 228, dir: -1, spd: 2.9, scale: 1, um: '#0b101f', op: 0.88},
  {x: 100, y: 229, dir: -1, spd: 3.2, scale: 1, um: '#3d3159', op: 0.9},
  {x: 420, y: 230, dir: -1, spd: 2.4, scale: 1, um: '#1d4e5c', op: 0.9},
  {x: 560, y: 227, dir: -1, spd: 3.4, scale: 1, um: '#0b1324', op: 0.9},
  {x: 250, y: 230, dir: -1, spd: 2.7, scale: 1, um: '#1b2743', op: 0.9},
  {x: -30, y: 207, dir: 1, spd: 1.9, scale: 0.86, um: '#15223a', op: 0.62},
  {x: 110, y: 209, dir: 1, spd: 2.4, scale: 0.86, um: '#23314f', op: 0.6},
  {x: 290, y: 208, dir: 1, spd: 1.7, scale: 0.86, um: '#0d1629', op: 0.62},
  {x: 390, y: 209, dir: 1, spd: 2.2, scale: 0.86, um: '#1a2946', op: 0.6},
  {x: 510, y: 208, dir: 1, spd: 2.0, scale: 0.86, um: '#101a30', op: 0.62},
  {x: 640, y: 209, dir: 1, spd: 1.5, scale: 0.86, um: '#273858', op: 0.58},
  {x: 40, y: 226, dir: -1, spd: 2.5, scale: 0.96, um: '#24364c', op: 0.86},
  {x: 200, y: 227, dir: -1, spd: 3.0, scale: 0.96, um: '#0d1a2c', op: 0.86},
  {x: 340, y: 225, dir: -1, spd: 2.8, scale: 0.96, um: '#21354c', op: 0.84},
  {x: 510, y: 227, dir: -1, spd: 2.2, scale: 0.96, um: '#101c2f', op: 0.86},
];

const crosswalkBands = [
  {x: 74, y: 221, w: 334, h: 2, o: 0.14},
  {x: 52, y: 229, w: 380, h: 3, o: 0.16},
  {x: 24, y: 238, w: 434, h: 3, o: 0.16},
  {x: -10, y: 248, w: 500, h: 4, o: 0.12},
];

export const CrowdScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const girlX = 229;
  const girlY = 202;
  return (
    <SceneSvg>
      <CityHero frame={frame} duration={duration} crowdMode crosswalk />
      <g>
        {crosswalkBands.map((band, i) => (
          <g key={i}>
            <rect x={band.x} y={band.y} width={band.w} height={band.h} fill="#d8dee8" opacity={band.o} />
            <rect x={band.x + 12} y={band.y + band.h} width={band.w - 24} height={1} fill="#e9eef5" opacity={band.o * 0.35} />
            {Array.from({length: 10}, (_, j) => (
              <rect
                key={j}
                x={band.x + 16 + j * Math.floor(band.w / 10)}
                y={band.y}
                width={2}
                height={band.h}
                fill="#0a1020"
                opacity={0.4}
              />
            ))}
          </g>
        ))}
      </g>
      <g>
        <NeonSign x={18} y={76} w={86} h={24} text="夜 戲" color={C.magenta} frame={frame} size={16} />
        <NeonSign x={443} y={85} w={15} h={45} text="唱片" color={C.cyan} vertical frame={frame} size={6} />
      </g>
      {crowdSeed.map((p, i) => {
        const range = 620;
        const raw = p.dir === 1
          ? p.x + frame * p.spd
          : p.x - frame * p.spd;
        const x = ((raw % range) + range) % range - 70;
        return (
          <CrowdFigure
            key={i}
            x={x}
            y={p.y}
            frame={frame}
            scale={p.scale}
            color="#070b16"
            umbrellaColor={p.um}
            opacity={p.op}
            phase={i * 1.7}
            speed={1.2 + (i % 3) * 0.3}
          />
        );
      })}
      <TrafficLight x={99} y={218} frame={frame} countdown />
      {/* still point in a moving world */}
      <g opacity={0.13}>
        <g transform="translate(0 486) scale(1 -1)">
          <Girl x={girlX} y={girlY} frame={frame} mode="look" />
        </g>
      </g>
      <Girl x={girlX} y={girlY} frame={frame} mode="look" />
      <g transform={`translate(${girlX - 8} ${girlY - 50})`} opacity={0.6}>
        <rect x={0} y={0} width={9} height={1} fill={C.cyan} opacity={0.45} />
        <rect x={1} y={-3} width={7} height={1} fill={C.cyan} opacity={0.3} />
        <rect x={3} y={-6} width={4} height={1} fill={C.cyan} opacity={0.2} />
      </g>
      <Rain frame={frame} count={100} top={0} bottom={270} speed={9} opacity={0.33} seed={67} splashY={250} />
      <g opacity={clamp01(interpolate(frame, [100, 150], [0, 0.5]))}>
        <rect x={156} y={70} width={180} height={100} fill={C.night1} opacity={0.16} />
      </g>
    </SceneSvg>
  );
};
