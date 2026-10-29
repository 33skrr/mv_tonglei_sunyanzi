import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp01} from '../theme';
import {PixelLabel, Rain, SceneSvg} from '../components/Primitives';
import {Girl, PaperCrane} from '../components/Characters';

const buildings = [
  {x: -10, w: 55, h: 74, y: 84},
  {x: 39, w: 37, h: 52, y: 106},
  {x: 72, w: 46, h: 88, y: 70},
  {x: 113, w: 28, h: 43, y: 115},
  {x: 136, w: 62, h: 65, y: 93},
  {x: 194, w: 35, h: 96, y: 62},
  {x: 225, w: 55, h: 58, y: 100},
  {x: 276, w: 44, h: 78, y: 80},
  {x: 316, w: 69, h: 50, y: 108},
  {x: 381, w: 40, h: 84, y: 74},
  {x: 418, w: 72, h: 61, y: 97},
];

const BusShelter: React.FC<{frame: number; duration: number}> = ({frame, duration}) => {
  const t = frame / duration;
  const arrival = clamp01((frame - 45) / 110);
  const girlX = t < 0.48 ? -12 + arrival * 99 : 87;
  const sit = frame > 174;
  const cranePicked = interpolate(frame, [300, 324], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const clockFast = frame > 150 && frame < 300;
  const minute = frame * (clockFast ? 0.85 : 0.18);
  const hour = 2 + frame / 160;
  const clockAngleMin = (minute % 60) * 6;
  const clockAngleHour = (hour % 12) * 30;
  const busX = -90 + ((frame * 1.25) % 650);
  const glow = 0.72 + Math.sin(frame * 0.08) * 0.07;
  return (
    <SceneSvg>
      {/* night air and distant city */}
      {['#070c18', '#0a1121', '#0d172b', '#111e35', '#162741', '#1b304d', '#233b58'].map((color, i) => (
        <rect key={i} x={0} y={i * 25} width={480} height={27} fill={color} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={0} y={142 + i * 2} width={480} height={2} fill={C.blueHi} opacity={0.03 + i * 0.01} />
      ))}
      {/* a few rain clouds instead of a second moon */}
      <g opacity={0.55}>
        <rect x={24} y={41} width={73} height={3} fill="#17263e" />
        <rect x={40} y={37} width={44} height={3} fill="#1b2b45" />
        <rect x={346} y={34} width={54} height={2} fill="#1c2b42" />
      </g>
      {/* far city */}
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h + 20} fill={i % 3 === 0 ? '#0c1528' : '#0a1222'} />
          {Array.from({length: Math.min(18, Math.floor(b.w / 5))}, (_, j) => (
            <rect
              key={j}
              x={b.x + 3 + (j % 7) * 7}
              y={b.y + 6 + Math.floor(j / 7) * 11}
              width={2}
              height={3}
              fill={j % 5 === 0 ? C.orange : j % 4 === 0 ? C.magenta : C.cyan}
              opacity={0.18 + ((i + j) % 3) * 0.1}
            />
          ))}
          {i === 6 ? (
            <g>
              <rect x={249} y={86} width={10} height={38} fill={C.black} opacity={0.75} />
              <text x={254} y={99} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={7} fill={C.cyan} style={{paintOrder: 'stroke', stroke: C.black, strokeWidth: 0.5}}>
                夜
              </text>
              <text x={254} y={111} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={7} fill={C.cyan} style={{paintOrder: 'stroke', stroke: C.black, strokeWidth: 0.5}}>
                雨
              </text>
            </g>
          ) : null}
        </g>
      ))}
      <rect x={0} y={171} width={480} height={2} fill={C.orange} opacity={0.12} />
      <rect x={0} y={175} width={480} height={55} fill="#080d18" />
      <rect x={0} y={175} width={480} height={3} fill="#26334b" />
      <rect x={0} y={228} width={480} height={42} fill="#070b13" />
      <rect x={0} y={228} width={480} height={2} fill="#3c4764" opacity={0.7} />
      {Array.from({length: 9}, (_, i) => (
        <rect key={i} x={(i * 58 + 14) % 470} y={244 + (i % 4) * 7} width={30} height={1} fill="#1b2436" opacity={0.9} />
      ))}
      {/* a bus travels through the background */}
      <g transform={`translate(${busX} 154)`} opacity={0.7}>
        <rect x={0} y={0} width={80} height={28} fill="#0a1220" />
        <rect x={4} y={4} width={72} height={15} fill="#13213a" />
        {Array.from({length: 6}, (_, i) => (
          <rect key={i} x={8 + i * 11} y={7} width={7} height={8} fill={i % 2 ? C.orange : C.cyan} opacity={0.45} />
        ))}
        <rect x={0} y={23} width={80} height={3} fill={C.orange} opacity={0.22} />
        <rect x={75} y={12} width={5} height={4} fill={C.red} opacity={0.8} />
        <rect x={2} y={12} width={4} height={3} fill={C.white} opacity={0.6} />
      </g>
      {/* bus shelter structure */}
      <g>
        <rect x={35} y={69} width={286} height={6} fill="#26344e" />
        <rect x={41} y={75} width={274} height={3} fill="#151f32" />
        <rect x={35} y={69} width={286} height={1} fill={C.cyan} opacity={0.2} />
        <rect x={38} y={74} width={4} height={150} fill="#2b3853" />
        <rect x={318} y={74} width={4} height={150} fill="#2b3853" />
        <rect x={35} y={218} width={290} height={4} fill="#1b2538" />
        <rect x={44} y={84} width={270} height={133} fill="#0d1a2c" opacity={0.36} />
        <rect x={44} y={84} width={270} height={2} fill={C.cyan} opacity={0.12} />
        {[92, 143, 194].map((x, i) => (
          <rect key={i} x={x} y={84} width={2} height={134} fill="#293a55" opacity={0.7} />
        ))}
        {/* condensation and rain on the shelter glass */}
        <g opacity={0.25}>
          {[58, 88, 112, 167, 206, 240, 281].map((x, i) => (
            <g key={i}>
              <rect x={x} y={100 + ((frame * 0.3 + i * 17) % 94)} width={1} height={8 + i * 2} fill={C.blueHi} />
              <rect x={x + 2} y={128 + ((frame * 0.18 + i * 11) % 66)} width={1} height={3} fill={C.cyanHi} />
            </g>
          ))}
        </g>
        <rect x={44} y={84} width={270} height={133} fill={C.blue} opacity={0.04} />
        {/* warm strip light in the shelter */}
        <rect x={58} y={88} width={130} height={4} fill={C.orangeHi} opacity={glow * 0.65} />
        <rect x={55} y={86} width={137} height={8} fill={C.orange} opacity={glow * 0.08} />
        <rect x={28} y={95} width={270} height={92} fill={C.orange} opacity={glow * 0.022} />
        {/* route sign */}
        <g transform="translate(51 96)">
          <rect x={0} y={0} width={89} height={28} fill="#0b1019" />
          <rect x={2} y={2} width={85} height={24} fill="#172437" />
          <text x={8} y={12} fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={7} fill={C.orangeHi}>
            夜班車
          </text>
          <text x={8} y={22} fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={5} fill={C.paper}>
            末班 · 23:40
          </text>
          <rect x={73} y={6} width={9} height={9} fill={C.orange} opacity={0.55} />
        </g>
        {/* handwritten flyer */}
        <g transform="translate(276 111)">
          <rect x={0} y={0} width={71} height={83} fill="#1a1713" />
          <rect x={2} y={2} width={67} height={79} fill="#0d1b22" />
          <rect x={7} y={8} width={57} height={67} fill="#cdbfa5" opacity={0.96} />
          <rect x={9} y={10} width={53} height={63} fill="#d8ccb4" />
          <circle cx={35} cy={24} r={10} fill="#4b3b30" />
          <circle cx={35} cy={24} r={3} fill="#d8ccb4" />
          <rect x={30} y={16} width={5} height={1} fill="#8b7259" opacity={0.6} />
          <text x={35} y={44} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={6} fill="#4b3b30">
            回聲唱片
          </text>
          <text x={35} y={53} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={6} fill="#4b3b30">
            夜間電台
          </text>
          <text x={35} y={63} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={4} fill="#6b5647">
            週五 22:00 · 舊電台二樓
          </text>
          <rect x={7} y={8} width={57} height={1} fill="#8b7259" opacity={0.5} />
          <rect x={7} y={74} width={57} height={1} fill="#8b7259" opacity={0.5} />
        </g>
        {/* bench */}
        <g>
          <rect x={57} y={184} width={236} height={4} fill="#80523a" />
          <rect x={57} y={184} width={236} height={1} fill="#c3875d" opacity={0.6} />
          <rect x={61} y={188} width={4} height={16} fill="#3d291f" />
          <rect x={200} y={188} width={4} height={16} fill="#3d291f" />
          <rect x={286} y={188} width={4} height={16} fill="#3d291f" />
          <rect x={57} y={199} width={236} height={6} fill="#9d6242" />
          <rect x={57} y={199} width={236} height={2} fill="#ce8e60" />
          <rect x={60} y={205} width={230} height={3} fill="#5d3828" />
          <rect x={57} y={208} width={236} height={16} fill="#43291f" />
          <rect x={57} y={221} width={236} height={3} fill="#231611" />
          {Array.from({length: 8}, (_, i) => (
            <rect key={i} x={63 + i * 29} y={211} width={19} height={1} fill="#2a1a14" opacity={0.7} />
          ))}
          <rect x={63} y={203} width={4} height={2} fill="#e7b089" opacity={0.3} />
          <rect x={173} y={203} width={2} height={2} fill={C.cyanHi} opacity={0.5} />
          <rect x={220} y={203} width={2} height={2} fill={C.orangeHi} opacity={0.4} />
          <rect x={75} y={200} width={8} height={1} fill={C.paper} opacity={0.2} />
          {/* a fallen leaf and a lost transfer ticket */}
          <rect x={148} y={198} width={5} height={2} fill="#8b603b" opacity={0.7} />
          <rect x={243} y={198} width={9} height={4} fill="#c9bda9" opacity={0.28} />
        </g>
        {/* clock on the right post */}
        <g transform="translate(350 92)">
          <rect x={0} y={0} width={48} height={48} fill="#171f2d" />
          <rect x={2} y={2} width={44} height={44} fill="#d8d2bc" />
          <rect x={4} y={4} width={40} height={40} fill="#1b2430" />
          {Array.from({length: 12}, (_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <rect
                key={i}
                x={23 + Math.round(Math.cos(angle) * 17)}
                y={23 + Math.round(Math.sin(angle) * 17)}
                width={1}
                height={1}
                fill={i % 3 === 0 ? C.orange : C.paper}
                opacity={0.7}
              />
            );
          })}
          <g transform="translate(24 24)">
            <rect
              x={-9}
              y={-1}
              width={9}
              height={2}
              fill={C.paper}
              transform={`rotate(${clockAngleHour})`}
            />
            <rect
              x={-14}
              y={-1}
              width={14}
              height={1}
              fill={C.cyan}
              transform={`rotate(${clockAngleMin})`}
            />
            <rect x={-1} y={-1} width={2} height={2} fill={C.orange} />
          </g>
          <text x={24} y={54} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={5} fill={C.cyan} opacity={0.5}>
            時間
          </text>
        </g>
        {/* stop sign */}
        <g transform="translate(360 148)">
          <rect x={0} y={0} width={2} height={73} fill="#303b51" />
          <rect x={-7} y={0} width={15} height={28} fill="#0c111b" />
          <circle cx={0.5} cy={9} r={5} fill={C.orange} />
          <circle cx={0.5} cy={9} r={3} fill="#0c111b" />
          <rect x={-5} y={18} width={11} height={1} fill={C.cyan} opacity={0.7} />
          <rect x={-5} y={22} width={8} height={1} fill={C.paper} opacity={0.3} />
        </g>
      </g>
      {/* street lamp and puddles */}
      <g>
        <rect x={430} y={63} width={3} height={168} fill="#2c3548" />
        <rect x={423} y={63} width={18} height={4} fill={C.orangeHi} opacity={0.35} />
        <rect x={420} y={68} width={24} height={2} fill={C.orange} opacity={0.25} />
        <rect x={424} y={70} width={16} height={4} fill={C.orangeHi} opacity={0.55} />
        <polygon points="424,76 440,76 463,228 401,228" fill={C.orange} opacity={0.045} />
        <rect x={33} y={241} width={103} height={1} fill={C.orange} opacity={0.16} />
        <rect x={44} y={245} width={62} height={1} fill={C.orangeHi} opacity={0.1} />
        <rect x={184} y={251} width={84} height={1} fill={C.cyan} opacity={0.12} />
        <rect x={197} y={255} width={43} height={1} fill={C.cyanHi} opacity={0.08} />
      </g>
      {/* the girl steps out of the rain and sits at one end */}
      <g opacity={0.12}>
        <g transform="translate(0 431) scale(1 -1)">
          <Girl x={sit ? 89 : girlX} y={sit ? 174 : 187} frame={frame} mode={sit ? 'sit' : 'walk'} scale={1} glow={false} />
        </g>
      </g>
      <Girl x={sit ? 89 : girlX} y={sit ? 174 : 187} frame={frame} mode={sit ? 'sit' : 'walk'} glow={false} />
      {/* a real paper crane, picked up near the end */}
      <PaperCrane
        x={205 - 93 * cranePicked}
        y={190 - 13 * cranePicked}
        frame={frame}
        scale={1.1}
        color={C.paper}
        glow={false}
      />
      {/* rain and street reflections */}
      <Rain frame={frame} count={88} top={0} bottom={270} speed={7} opacity={0.28} seed={77} color={C.blueHi} splashY={258} splash />
      <g opacity={0.4}>
        <rect x={104} y={252} width={36} height={2} fill={C.cyan} opacity={0.08} />
        <rect x={250} y={259} width={58} height={2} fill={C.orange} opacity={0.08} />
      </g>
      <PixelLabel x={462} y={260} size={3.5} color={C.blueHi} opacity={0.3} font="cn" anchor="end">
        末班
      </PixelLabel>
      <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={clamp01(1 - frame / 8)} />
    </SceneSvg>
  );
};

export const EmptySeatScene: React.FC<{duration: number; frameOffset?: number}> = ({duration, frameOffset = 0}) => {
  const frame = useCurrentFrame() + frameOffset;
  return <BusShelter frame={frame} duration={duration} />;
};
