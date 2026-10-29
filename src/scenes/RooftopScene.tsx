import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp01, mixColor, mulberry32, stepClock} from '../theme';
import {Boy, Girl, PaperCrane} from '../components/Characters';
import {Cloud, Dither, FishSprite, Moon, PixelLabel, Rain, SceneSvg, Sparkle, StarField} from '../components/Primitives';

const citySeed = mulberry32(81);
const distantBuildings = Array.from({length: 22}, (_, i) => {
  const w = 12 + Math.floor(citySeed() * 30);
  const h = 12 + Math.floor(citySeed() * 44);
  return {
    x: -20 + i * 24 + Math.floor(citySeed() * 8),
    w,
    h,
    seed: Math.floor(citySeed() * 9999),
  };
});

const DistantCity: React.FC<{frame: number; dawn: number; scale?: number}> = ({frame, dawn, scale = 1}) => (
  <g opacity={0.95}>
    <rect x={0} y={171} width={480} height={50} fill={mixColor('#070b17', '#392f39', dawn)} />
    {distantBuildings.map((b, i) => {
      const rand = mulberry32(b.seed);
      const top = 205 - b.h;
      return (
        <g key={i}>
          <rect x={b.x} y={top} width={b.w} height={b.h + 20} fill={mixColor('#0b1428', '#4a3740', dawn)} />
          {Array.from({length: Math.min(10, Math.floor(b.w / 4))}, (_, j) => {
            const lit = rand() > 0.42;
            return lit ? (
              <rect
                key={j}
                x={b.x + 2 + j * 4}
                y={top + 4 + Math.floor(rand() * Math.max(1, b.h - 8))}
                width={1}
                height={2}
                fill={dawn > 0.5 ? C.orangeHi : j % 4 === 0 ? C.cyan : C.orange}
                opacity={0.24 + dawn * 0.28}
              />
            ) : null;
          })}
          {i % 4 === 0 ? (
            <rect x={b.x + Math.floor(b.w / 2)} y={top - 2} width={1} height={2} fill={C.red} opacity={0.4} />
          ) : null}
        </g>
      );
    })}
    {[24, 88, 155, 247, 331, 412, 461].map((x, i) => (
      <rect key={i} x={x} y={182 + (i % 4) * 7} width={2} height={1} fill={i % 2 ? C.magenta : C.cyan} opacity={0.3} />
    ))}
    {[52, 126, 214, 290, 365, 441].map((x, i) => (
      <g key={`glow-${i}`} opacity={0.18 + dawn * 0.25}>
        <rect x={x} y={194 + (i % 3) * 4} width={9 + (i % 3) * 5} height={1} fill={i % 2 ? C.magenta : C.cyan} />
        <rect x={x + 2} y={198 + (i % 3) * 4} width={4} height={1} fill={C.orange} />
      </g>
    ))}
    <rect x={0} y={198} width={480} height={1} fill={C.orange} opacity={0.09} />
    <rect x={0} y={160} width={480} height={26} fill={mixColor('#18233c', '#b47b78', dawn)} opacity={0.08} />
  </g>
);

const StringLights: React.FC<{frame: number; y?: number}> = ({frame, y = 100}) => {
  const bulbs = Array.from({length: 16}, (_, i) => {
    const x = 8 + i * 30;
    const sag = Math.round(Math.sin((x / 480) * Math.PI) * 18);
    return {x, y: y + sag, on: (frame + i * 9) % 83 > 4};
  });
  return (
    <g>
      <path
        d={`M 8 ${y} Q 120 ${y + 26} 240 ${y + 18} T 472 ${y + 4}`}
        fill="none"
        stroke="#2b2d35"
        strokeWidth={1}
      />
      {bulbs.map((b, i) => (
        <g key={i} opacity={b.on ? 0.9 : 0.35}>
          <rect x={b.x} y={b.y} width={1} height={2} fill="#3a3330" />
          <rect x={b.x - 1} y={b.y + 2} width={3} height={2} fill={i % 5 === 0 ? C.cyan : C.orangeHi} />
          <rect x={b.x - 2} y={b.y + 1} width={5} height={4} fill={i % 5 === 0 ? C.cyan : C.orange} opacity={0.1} />
        </g>
      ))}
    </g>
  );
};

const WaterTank: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={0} y={0} width={86} height={9} fill="#131927" />
    <rect x={5} y={9} width={76} height={8} fill="#0e1420" />
    <rect x={10} y={17} width={66} height={46} fill="#101725" />
    <rect x={12} y={17} width={62} height={4} fill="#1c2740" />
    <rect x={14} y={26} width={58} height={1} fill="#1a2338" />
    <rect x={14} y={38} width={58} height={1} fill="#1a2338" />
    <rect x={14} y={50} width={58} height={1} fill="#1a2338" />
    <rect x={8} y={63} width={70} height={4} fill="#080c15" />
    <rect x={14} y={67} width={3} height={45} fill="#161e2d" />
    <rect x={66} y={67} width={3} height={45} fill="#161e2d" />
    <rect x={20} y={73} width={45} height={1} fill="#222d44" opacity={0.6} />
    <rect x={48} y={17} width={1} height={46} fill="#2b3446" opacity={0.4} />
    <rect x={10} y={-12} width={2} height={12} fill="#202b3f" />
    <rect x={45} y={-7} width={1} height={7} fill="#202b3f" />
  </g>
);

export const Whale: React.FC<{frame: number; x: number; y: number; opacity?: number; scale?: number}> = ({
  frame,
  x,
  y,
  opacity = 1,
  scale = 1,
}) => {
  const rand = mulberry32(773);
  const stars = Array.from({length: 24}, () => ({x: 130 + rand() * 115, y: 20 + rand() * 36, p: rand() * 6, s: rand() > 0.8 ? 2 : 1}));
  return (
    <g
      transform={`translate(${Math.round(x + Math.sin(frame * 0.008) * 10)} ${Math.round(y + Math.sin(frame * 0.018) * 6)}) scale(${scale})`}
      opacity={opacity}
    >
      {/* a halo made of sparse, warm dust */}
      <g opacity={0.2}>
        {Array.from({length: 30}, (_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const radius = 104 + Math.sin(frame * 0.02 + i) * 4;
          return (
            <rect
              key={i}
              x={Math.round(176 + Math.cos(angle) * radius)}
              y={Math.round(37 + Math.sin(angle) * 44)}
              width={2}
              height={2}
              fill={i % 3 === 0 ? C.orangeHi : C.paper}
              opacity={0.18 + 0.25 * Math.sin(frame * 0.06 + i)}
            />
          );
        })}
      </g>
      <path
        d="M 78 10 L 100 36 L 138 33 L 156 18 L 188 13 L 222 15 L 246 23 L 258 34 L 263 43 L 257 52 L 242 59 L 218 62 L 194 57 L 163 51 L 127 59 L 104 72 L 115 48 L 87 42 Z"
        fill="#1a2533"
        stroke="#7f8a83"
        strokeWidth={1}
        opacity={0.98}
      />
      {/* tail flukes read as two stepped fins */}
      <path d="M 100 36 L 78 10 L 87 42 L 74 40 L 94 48 L 127 59 L 115 48 L 138 33 Z" fill="#141e29" />
      <path d="M 163 51 L 165 68 L 193 62 L 188 13 L 156 18 L 127 59 Z" fill="#1d2a36" opacity={0.9} />
      {/* belly */}
      <path d="M 151 39 L 190 49 L 220 53 L 242 50 L 235 57 L 212 61 L 190 56 L 166 50 Z" fill="#2b3640" opacity={0.75} />
      <path d="M 240 26 L 256 38 L 250 42 L 238 34 Z" fill="#26333c" opacity={0.7} />
      {/* pectoral fin */}
      <path d="M 198 45 L 177 70 L 200 61 L 209 53 Z" fill="#151f29" stroke="#6f7b76" strokeWidth={1} />
      {/* flank grooves */}
      <rect x={162} y={37} width={33} height={1} fill="#6f7b76" opacity={0.25} />
      <rect x={160} y={41} width={39} height={1} fill="#6f7b76" opacity={0.2} />
      <rect x={162} y={45} width={33} height={1} fill="#6f7b76" opacity={0.16} />
      <rect x={247} y={38} width={13} height={1} fill="#0d1720" opacity={0.7} />
      {/* eye */}
      <rect x={239} y={30} width={5} height={4} fill="#0b1016" />
      <rect x={240} y={31} width={2} height={2} fill={C.paper} />
      <rect x={243} y={31} width={1} height={1} fill={C.orangeHi} />
      {/* starlight inside the whale */}
      {stars.map((s, i) => {
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.045 + s.p));
        return <rect key={i} x={Math.round(s.x)} y={Math.round(s.y)} width={s.s} height={s.s} fill={i % 4 === 0 ? C.paper : C.orangeHi} opacity={twinkle * 0.65} />;
      })}
      {/* tiny escort fish */}
      <FishSprite x={275} y={55} scale={0.8} color={C.cyan} eye={C.night0} opacity={0.45 + Math.sin(frame * 0.1) * 0.15} />
      <FishSprite x={60} y={63} scale={0.6} color={C.cyanDim} eye={C.night0} opacity={0.3} />
      <Sparkle x={196} y={19} frame={frame} phase={2} color={C.orangeHi} size={1} />
      <Sparkle x={225} y={48} frame={frame} phase={4} color={C.paper} />
      {/* musical wake */}
      <g opacity={0.2}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-10 - i * 18} y={40 + i * 5} width={12} height={1} fill={C.orangeHi} opacity={0.4 - i * 0.08} />
        ))}
      </g>
    </g>
  );
};

const RooftopSet: React.FC<{frame: number; dawn?: number; together?: boolean}> = ({frame, dawn = 0, together = false}) => {
  const skyBands = 10;
  const night = ['#050812', '#070c19', '#0a1122', '#0d172b', '#111e36', '#162642', '#1c2f4e', '#24395b', '#304664', '#3b5372'];
  const day = ['#25334f', '#3d4765', '#5f5a75', '#8a6d7d', '#b77e82', '#dc9290', '#f0b294', '#f8c9a2', '#f9dcb8', '#fbe8cc'];
  return (
    <>
      {Array.from({length: skyBands}, (_, i) => (
        <rect key={i} x={0} y={i * 20} width={480} height={22} fill={mixColor(night[i], day[i], dawn)} />
      ))}
      <StarField
        frame={frame}
        count={90}
        seed={74}
        top={0}
        height={150}
        opacity={0.85 * (1 - dawn)}
      />
      {dawn < 0.55 ? <Moon x={128 - dawn * 20} y={32} scale={2} color={mixColor(C.paper, C.orangeHi, dawn)} /> : null}
      <g opacity={0.82 - dawn * 0.4}>
        <Cloud x={10 + ((frame * 0.03) % 40)} y={50} scale={0.9} color={mixColor('#16243f', '#8a6172', dawn)} />
        <Cloud x={280 + ((frame * 0.02) % 90)} y={27} scale={1.1} color={mixColor('#1b2948', '#a56e78', dawn)} />
        <Cloud x={170 + ((frame * 0.018) % 60)} y={88} scale={0.7} color={mixColor('#203052', '#b47a7d', dawn)} />
        <Cloud x={-22 + ((frame * 0.01) % 50)} y={116} scale={1.55} color={mixColor('#22334f', '#8d6572', dawn)} opacity={0.65} />
        <Cloud x={360 + ((frame * 0.008) % 70)} y={101} scale={1.15} color={mixColor('#243650', '#996c78', dawn)} opacity={0.6} />
      </g>
      {/* a real overnight flight crossing the sky */}
      <g opacity={0.35}>
        <rect x={((frame * 0.55 + 250) % 620) - 70} y={73} width={32} height={1} fill={C.paper} opacity={0.12} />
        <rect x={((frame * 0.55 + 280) % 620) - 70} y={71} width={10} height={3} fill="#24242e" />
        <rect x={((frame * 0.55 + 280) % 620) - 64} y={69} width={4} height={1} fill="#24242e" />
        <rect x={((frame * 0.55 + 280) % 620) - 62} y={74} width={4} height={1} fill="#24242e" />
        <rect x={((frame * 0.55 + 280) % 620) - 61} y={71} width={1} height={1} fill={frame % 36 < 4 ? C.red : '#3a2a2c'} />
      </g>
      {dawn > 0.35 ? (
        <g opacity={clamp01((dawn - 0.35) / 0.3) * 0.55}>
          {[0, 1, 2, 3].map((i) => {
            const x = 60 + i * 24 + ((frame * 0.16) % 90);
            const y = 95 + Math.sin(frame * 0.02 + i) * 4 + i * 7;
            return (
              <g key={i}>
                <rect x={x} y={y} width={3} height={1} fill="#2e2c35" />
                <rect x={x + 3} y={y - 1} width={2} height={1} fill="#2e2c35" />
                <rect x={x + 5} y={y} width={2} height={1} fill="#2e2c35" />
              </g>
            );
          })}
        </g>
      ) : null}
      <DistantCity frame={frame} dawn={dawn} />
      {/* a distant broadcast tower, red beacon blinking */}
      <g opacity={0.32 + dawn * 0.08}>
        <rect x={326} y={92} width={2} height={68} fill="#1b2637" />
        <rect x={352} y={92} width={2} height={68} fill="#1b2637" />
        <rect x={330} y={112} width={20} height={1} fill="#1b2637" />
        <rect x={332} y={128} width={16} height={1} fill="#1b2637" />
        <rect x={334} y={142} width={12} height={1} fill="#1b2637" />
        <rect x={338} y={68} width={4} height={26} fill="#1b2637" />
        <rect x={339} y={58} width={2} height={12} fill="#1b2637" />
        <rect x={340} y={55} width={1} height={4} fill={frame % 42 < 7 ? C.red : '#3a2024'} />
        <rect x={337} y={83} width={6} height={1} fill="#1b2637" />
        <rect x={336} y={100} width={8} height={1} fill="#1b2637" />
        <rect x={340} y={88} width={1} height={1} fill={C.orangeHi} opacity={0.45} />
      </g>
      {dawn > 0.1 ? (
        <g opacity={dawn * 0.4}>
          <rect x={0} y={158} width={480} height={30} fill={C.orange} opacity={0.08} />
          <rect x={0} y={166} width={480} height={8} fill={C.orangeHi} opacity={0.05} />
        </g>
      ) : null}
      {/* rooftop floor and ledge */}
      <rect x={0} y={221} width={480} height={49} fill="#060a12" />
      <rect x={0} y={216} width={480} height={7} fill="#151d2d" />
      <rect x={0} y={223} width={480} height={3} fill="#26304a" />
      <rect x={0} y={226} width={480} height={44} fill="#0b0f19" />
      {Array.from({length: 12}, (_, i) => (
        <rect key={i} x={(i * 43 + 7) % 480} y={228 + (i % 4) * 8} width={28} height={1} fill="#151b2b" opacity={0.7} />
      ))}
      <WaterTank x={22} y={112} scale={0.9} />
      {/* AC unit / vent */}
      <g transform="translate(389 185)">
        <rect x={0} y={0} width={68} height={43} fill="#161c2b" />
        <rect x={5} y={5} width={58} height={19} fill="#0b101b" />
        {Array.from({length: 8}, (_, i) => (
          <rect key={i} x={9 + i * 6} y={7} width={1} height={15} fill="#303a50" opacity={0.8} />
        ))}
        <rect x={5} y={28} width={58} height={2} fill="#2a3347" />
        <circle cx={17} cy={36} r={2} fill="#0b101b" />
        <circle cx={24} cy={36} r={2} fill="#0b101b" />
        <rect x={0} y={0} width={68} height={1} fill="#46506a" opacity={0.4} />
      </g>
      {/* antenna */}
      <g>
        <rect x={449} y={93} width={2} height={126} fill="#1c2436" />
        <rect x={440} y={111} width={14} height={1} fill="#1c2436" />
        <rect x={443} y={128} width={16} height={1} fill="#1c2436" />
        <rect x={436} y={145} width={18} height={1} fill="#1c2436" />
        <rect x={448} y={90} width={4} height={3} fill={Math.floor(frame / 18) % 2 ? C.red : '#3a1c25'} />
        <rect x={447} y={89} width={6} height={1} fill={C.red} opacity={0.25} />
      </g>
      {/* string lights */}
      <StringLights frame={frame} y={96} />
      {/* puddles and small props */}
      <rect x={58} y={244} width={76} height={1} fill={C.cyan} opacity={0.18} />
      <rect x={64} y={247} width={44} height={1} fill={C.cyan} opacity={0.1} />
      <rect x={320} y={250} width={55} height={1} fill={C.orange} opacity={0.15} />
      <rect x={170} y={252} width={70} height={1} fill={C.magenta} opacity={0.1} />
      <rect x={184} y={256} width={32} height={1} fill={C.cyan} opacity={0.08} />
      <rect x={112} y={230} width={29} height={2} fill="#1d2638" />
      <rect x={128} y={226} width={2} height={5} fill="#1d2638" />
      {/* potted plant in the dark */}
      <g transform="translate(30 228)">
        <rect x={0} y={12} width={20} height={13} fill="#241b1c" />
        <rect x={2} y={12} width={16} height={2} fill="#44312e" />
        <rect x={4} y={2} width={3} height={11} fill="#1f392f" />
        <rect x={8} y={0} width={3} height={13} fill="#284637" />
        <rect x={12} y={4} width={3} height={9} fill="#1b3028" />
        <rect x={1} y={7} width={3} height={8} fill="#1b3028" />
        <rect x={17} y={8} width={2} height={6} fill="#223a2e" />
      </g>
      <g transform="translate(133 232)">
        <rect x={0} y={0} width={12} height={11} fill="#202834" />
        <rect x={1} y={0} width={10} height={2} fill="#3b465b" />
        <rect x={3} y={3} width={6} height={1} fill="#0b1019" />
        <rect x={-1} y={10} width={14} height={2} fill="#101620" />
      </g>
      {/* fog gathering at the edge of the city */}
      <rect x={0} y={168} width={480} height={17} fill={mixColor(C.cyan, C.magenta, 0.35)} opacity={0.035 + dawn * 0.04} />
      <rect x={0} y={182} width={480} height={9} fill={C.orange} opacity={0.025 + dawn * 0.03} />
      <g transform="translate(142 207)">
        <rect x={0} y={0} width={20} height={20} fill="#151b28" />
        <rect x={2} y={2} width={16} height={7} fill="#0a0f17" />
        <rect x={2} y={11} width={16} height={2} fill="#262f40" />
        <rect x={5} y={15} width={2} height={2} fill={C.blueHi} opacity={0.4} />
      </g>
      {!together ? (
        <g>
          <rect x={306} y={216} width={27} height={3} fill="#172033" />
          <g transform="translate(312 207)">
            <rect x={0} y={0} width={16} height={10} fill="#0a0e16" />
            <rect x={2} y={2} width={12} height={4} fill="#0d241e" />
            <rect x={3} y={3} width={10} height={2} fill={C.green} opacity={0.4} />
            <rect x={12} y={-2} width={1} height={2} fill={C.stoneHi} />
          </g>
        </g>
      ) : null}
      {together ? null : null}
    </>
  );
};

const SeatedGirlBack: React.FC<{x: number; y: number; frame: number; lean?: number}> = ({x, y, frame, lean = 0}) => (
  <g transform={`translate(${Math.round(x)} ${Math.round(y)})`}>
    <g transform={`translate(${lean} ${Math.round(lean / 2)})`}>
      {/* head & hair */}
      <rect x={12} y={0} width={23} height={24} fill={C.hair} />
      <rect x={9} y={4} width={4} height={17} fill={C.hair} />
      <rect x={34} y={4} width={4} height={17} fill={C.hair} />
      <rect x={14} y={0} width={18} height={3} fill={C.hairHi} opacity={0.8} />
      <rect x={12} y={20} width={7} height={8} fill={C.hairShadow} />
      <rect x={30} y={20} width={7} height={8} fill={C.hairShadow} />
      <rect x={17} y={4} width={13} height={2} fill={C.hairHi} opacity={0.4} />
      {/* headphone band */}
      <rect x={8} y={2} width={32} height={3} fill={C.cyanDim} />
      <rect x={6} y={10} width={7} height={14} fill={C.cyan} />
      <rect x={35} y={10} width={7} height={14} fill={C.cyan} />
      <rect x={8} y={13} width={3} height={7} fill={C.cyanHi} opacity={0.4} />
      <rect x={38} y={17} width={1} height={1} fill={Math.floor(frame / 14) % 2 ? C.cyanHi : C.cyanDim} />
      {/* hood and coat */}
      <rect x={6} y={22} width={33} height={9} fill={C.yellowDim} />
      <rect x={3} y={29} width={43} height={38} fill={C.yellowDim} />
      <rect x={6} y={32} width={37} height={32} fill={C.yellow} />
      <rect x={14} y={27} width={18} height={15} fill={C.yellowDim} />
      <rect x={16} y={29} width={14} height={11} fill={C.yellow} />
      <rect x={9} y={35} width={2} height={23} fill={C.orange} opacity={0.35} />
      <rect x={19} y={38} width={13} height={2} fill={C.yellowHi} opacity={0.4} />
      <rect x={36} y={34} width={2} height={25} fill={C.orange} opacity={0.45} />
      {/* hood seam, belt and fabric folds */}
      <path d="M 14 27 L 22 24 L 30 27 L 32 36 L 24 40 L 16 36 Z" fill={C.yellowDim} />
      <path d="M 17 28 L 23 26 L 28 28 L 29 34 L 23 37 L 18 34 Z" fill={C.yellowHi} opacity={0.24} />
      <rect x={8} y={55} width={34} height={2} fill={C.orange} opacity={0.4} />
      <rect x={23} y={36} width={1} height={23} fill={C.yellowHi} opacity={0.25} />
      <rect x={12} y={60} width={22} height={2} fill={C.yellowDim} opacity={0.7} />
      <rect x={13} y={44} width={1} height={7} fill={C.yellowHi} opacity={0.3} />
      <rect x={33} y={43} width={2} height={6} fill={C.yellowDim} />
      <rect x={38} y={56} width={2} height={3} fill={C.yellowHi} opacity={0.25} />
      {/* scarf from behind */}
      <rect x={12} y={23} width={24} height={3} fill="#193f48" />
      <rect x={16} y={26} width={16} height={2} fill={C.teal} opacity={0.8} />
      <rect x={31} y={27} width={4} height={9} fill="#193f48" opacity={0.8} />
      {/* fish pin */}
      <rect x={9} y={48} width={4} height={2} fill={C.cyan} />
      <rect x={11} y={47} width={2} height={4} fill={C.cyan} />
      <rect x={8} y={50} width={2} height={1} fill={C.cyan} />
      {/* arms */}
      <rect x={0} y={35} width={5} height={26} fill={C.yellowDim} />
      <rect x={1} y={57} width={5} height={5} fill={C.skin} />
      <rect x={44} y={36} width={5} height={24} fill={C.yellowDim} />
      <rect x={43} y={57} width={5} height={5} fill={C.skin} />
      {/* legs over the ledge */}
      <rect x={10} y={65} width={11} height={21} fill={C.hair} />
      <rect x={25} y={65} width={11} height={21} fill={C.hairShadow} />
      <rect x={7} y={84} width={15} height={5} fill={C.red} />
      <rect x={23} y={84} width={15} height={5} fill={C.red} />
      <rect x={7} y={88} width={15} height={2} fill={C.hairShadow} />
      <rect x={23} y={88} width={15} height={2} fill={C.hairShadow} />
      {/* tote bag strap */}
      <rect x={39} y={30} width={1} height={22} fill={C.hairShadow} opacity={0.6} />
    </g>
  </g>
);

const SeatedBoyBack: React.FC<{x: number; y: number; frame: number}> = ({x, y, frame}) => (
  <g transform={`translate(${Math.round(x)} ${Math.round(y)})`}>
    {/* head */}
    <rect x={10} y={0} width={22} height={23} fill={C.hair} />
    <rect x={7} y={5} width={4} height={16} fill={C.hairShadow} />
    <rect x={31} y={5} width={4} height={16} fill={C.hairShadow} />
    <rect x={13} y={0} width={16} height={3} fill={C.hairHi} opacity={0.35} />
    <rect x={12} y={4} width={14} height={2} fill={C.hairHi} opacity={0.35} />
    {/* headphones */}
    <rect x={6} y={2} width={31} height={3} fill={C.orange} />
    <rect x={4} y={10} width={7} height={13} fill={C.orange} />
    <rect x={32} y={10} width={7} height={13} fill={C.orange} />
    <rect x={6} y={13} width={3} height={7} fill={C.orangeHi} opacity={0.4} />
    <rect x={35} y={17} width={1} height={1} fill={Math.floor(frame / 17) % 2 ? C.orangeHi : C.orange} />
    {/* scarf */}
    <rect x={7} y={21} width={28} height={5} fill={C.red} />
    <rect x={9} y={25} width={5} height={10} fill={C.red} opacity={0.86} />
    {/* jacket */}
    <rect x={2} y={26} width={40} height={40} fill="#12343d" />
    <rect x={6} y={29} width={32} height={35} fill={C.teal} />
    <rect x={19} y={31} width={2} height={30} fill={C.cyanDim} opacity={0.5} />
    <rect x={11} y={38} width={18} height={2} fill={C.cyan} opacity={0.22} />
    <rect x={34} y={30} width={1} height={32} fill={C.cyanDim} opacity={0.45} />
    <rect x={9} y={47} width={18} height={2} fill="#1d6b71" opacity={0.5} />
    <rect x={8} y={55} width={28} height={2} fill="#123c44" opacity={0.9} />
    <rect x={14} y={34} width={1} height={18} fill={C.cyan} opacity={0.18} />
    <rect x={28} y={31} width={2} height={9} fill={C.cyanDim} opacity={0.3} />
    <rect x={31} y={52} width={5} height={2} fill="#1a4a52" />
    <rect x={4} y={36} width={4} height={2} fill={C.cyan} opacity={0.15} />
    {/* arms */}
    <rect x={-1} y={32} width={5} height={27} fill="#12343d" />
    <rect x={0} y={56} width={4} height={5} fill={C.skinShadow} />
    <rect x={40} y={32} width={5} height={25} fill="#12343d" />
    <rect x={40} y={55} width={4} height={5} fill={C.skinShadow} />
    {/* legs */}
    <rect x={10} y={64} width={11} height={22} fill={C.night3} />
    <rect x={24} y={64} width={11} height={22} fill={C.night2} />
    <rect x={8} y={84} width={14} height={4} fill={C.paper} />
    <rect x={23} y={84} width={14} height={4} fill={C.paper} />
    <rect x={8} y={87} width={14} height={2} fill={C.stoneHi} />
    <rect x={23} y={87} width={14} height={2} fill={C.stoneHi} />
  </g>
);

const SeatedPair: React.FC<{frame: number; local: number}> = ({frame, local}) => {
  const lean = local > 40 ? Math.min(7, Math.floor((local - 40) / 12)) : 0;
  const drift = Math.round(Math.sin(frame * 0.04) * 1);
  return (
    <g transform={`translate(0 ${drift})`}>
      <SeatedGirlBack x={183} y={148} frame={frame} lean={lean} />
      <SeatedBoyBack x={238} y={145} frame={frame} />
      {/* radio between them */}
      <g transform="translate(222 202)">
        <rect x={0} y={0} width={22} height={13} fill="#0a0f14" />
        <rect x={2} y={2} width={18} height={9} fill="#152023" />
        <rect x={4} y={4} width={8} height={5} fill="#062018" />
        <path d={`M 5 ${6 + Math.sin(frame * 0.2)} L 7 ${6 + Math.sin(frame * 0.2 + 1)} L 9 ${6 + Math.sin(frame * 0.2 + 2)} L 11 ${6 + Math.sin(frame * 0.2 + 3)}`} fill="none" stroke={C.green} strokeWidth={1} />
        <circle cx={16} cy={7} r={2} fill="#2c2723" />
        <rect x={15} y={5} width={1} height={2} fill={C.orange} />
        <rect x={-3} y={13} width={28} height={1} fill={C.cyan} opacity={0.25} />
      </g>
      {/* rim light from the city */}
      <g opacity={0.5}>
        <rect x={184} y={148} width={12} height={1} fill={C.cyanHi} opacity={0.4} />
        <rect x={181} y={153} width={2} height={14} fill={C.cyanHi} opacity={0.25} />
        <rect x={228} y={181} width={2} height={26} fill={C.orangeHi} opacity={0.32} />
        <rect x={238} y={146} width={10} height={1} fill={C.cyanHi} opacity={0.35} />
        <rect x={281} y={180} width={2} height={24} fill={C.orangeHi} opacity={0.25} />
        <rect x={247} y={170} width={13} height={1} fill={C.cyan} opacity={0.22} />
      </g>
    </g>
  );
};

const Motes: React.FC<{frame: number; opacity: number; count?: number}> = ({frame, opacity, count = 44}) => {
  const rand = mulberry32(911);
  const motes = Array.from({length: count}, () => ({
    x: rand() * 480,
    y: rand() * 240,
    spd: 0.2 + rand() * 0.6,
    ph: rand() * 40,
    c: rand() > 0.7 ? C.cyanHi : rand() > 0.5 ? C.orangeHi : C.cyan,
    s: rand() > 0.85 ? 2 : 1,
  }));
  return (
    <g opacity={opacity}>
      {motes.map((m, i) => {
        const y = 260 - ((frame * m.spd + m.ph) % 260);
        const x = m.x + Math.sin(frame * 0.02 + m.ph) * 6;
        return <rect key={i} x={Math.round(x)} y={Math.round(y)} width={m.s} height={m.s} fill={m.c} opacity={0.2 + (m.s === 2 ? 0.4 : 0.15)} />;
      })}
    </g>
  );
};

const Arrival: React.FC<{frame: number; duration: number}> = ({frame, duration}) => {
  const progress = duration > 0 ? frame / duration : 0;
  const walk = Math.min(1, progress / 0.72);
  const girlX = 30 + walk * 254;
  const boyX = 346;
  const boyFlip = true;
  const girlMode = progress > 0.72 ? 'look' : 'walk';
  return (
    <SceneSvg>
      <RooftopSet frame={frame} dawn={0.04} />
      {/* the boy at the edge */}
      <g opacity={0.95}>
        <Boy x={boyX} y={190} frame={frame} mode="stand" flip={boyFlip} glow={false} />
      </g>
      <g opacity={0.12}>
        <g transform="translate(0 460) scale(1 -1)">
          <Boy x={boyX} y={190} frame={frame} mode="stand" flip={boyFlip} glow={false} />
        </g>
      </g>
      {/* girl arrives through the rain */}
      <Girl x={girlX} y={194} frame={frame} mode={girlMode} glow={false} />
      <Rain frame={frame} count={150} top={0} bottom={270} speed={8} opacity={0.42} seed={43} splashY={238} splash />
      <rect x={0} y={244} width={480} height={1} fill={C.cyan} opacity={0.12} />
    </SceneSvg>
  );
};

const Together: React.FC<{frame: number}> = ({frame}) => {
  const dawn = clamp01(interpolate(frame, [55, 240], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const rainO = clamp01(interpolate(frame, [0, 160], [0.7, 0]));
  return (
    <SceneSvg>
      <RooftopSet frame={frame} dawn={dawn} together />
      <Motes frame={frame} opacity={0.65 + dawn * 0.2} />
      {rainO > 0 ? <Rain frame={frame} count={60} top={0} bottom={270} speed={5} opacity={rainO * 0.35} seed={45} splashY={240} /> : null}
      <SeatedPair frame={frame} local={frame} />
      {/* the parapet in front makes it clear they are sitting on the edge */}
      <g>
        <rect x={0} y={220} width={480} height={8} fill="#1d2637" />
        <rect x={0} y={222} width={480} height={2} fill={C.cyan} opacity={dawn > 0.2 ? 0.1 : 0.2} />
        <rect x={0} y={228} width={480} height={42} fill="#0a0e17" />
        <rect x={0} y={228} width={480} height={2} fill="#161e2c" />
        {Array.from({length: 15}, (_, i) => (
          <rect key={i} x={(i * 37 + 4) % 480} y={233 + (i % 5) * 7} width={24} height={1} fill="#161d2b" opacity={0.9} />
        ))}
        <rect x={0} y={266} width={480} height={4} fill="#05080f" />
        {/* faded graffiti on the rooftop wall */}
        <g opacity={0.14}>
          <text x={88} y={256} fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={16} fill={C.magenta}>
            天臺
          </text>
        </g>
        <g opacity={0.2}>
          <rect x={390} y={246} width={38} height={1} fill={C.orange} />
          <rect x={402} y={251} width={14} height={1} fill={C.orange} />
        </g>
        {/* hands resting on the edge */}
        <g>
          <rect x={214} y={216} width={11} height={4} fill={C.skin} />
          <rect x={216} y={218} width={7} height={2} fill={C.skinHi} opacity={0.45} />
          <rect x={214} y={219} width={11} height={1} fill={C.skinShadow} opacity={0.6} />
          <rect x={264} y={216} width={11} height={4} fill={C.skinShadow} />
          <rect x={266} y={218} width={7} height={2} fill={C.skin} opacity={0.75} />
          <rect x={264} y={219} width={11} height={1} fill="#6e4d43" opacity={0.7} />
        </g>
        {/* warm cups on the ledge */}
        <g transform="translate(193 208)">
          <rect x={0} y={0} width={10} height={9} fill="#2e2820" />
          <rect x={1} y={0} width={8} height={1} fill={C.paper} opacity={0.35} />
          <rect x={10} y={2} width={2} height={4} fill="#2e2820" />
          <rect x={2} y={-3} width={2} height={3} fill={C.paper} opacity={0.18} />
          <rect x={6} y={-4} width={2} height={4} fill={C.paper} opacity={0.12} />
        </g>
        <g transform="translate(284 209)">
          <rect x={0} y={0} width={9} height={8} fill="#2b2d26" />
          <rect x={1} y={0} width={7} height={1} fill={C.paper} opacity={0.3} />
          <rect x={9} y={2} width={2} height={3} fill="#2b2d26" />
          <rect x={2} y={-2} width={2} height={2} fill={C.paper} opacity={0.14} />
        </g>
      </g>
      {/* legs dangling over the city side of the parapet */}
      <g>
        <g transform={`translate(${Math.round(Math.sin(frame * 0.04) * 1)} 0)`}>
          <rect x={203} y={222} width={8} height={16} fill={C.hair} />
          <rect x={214} y={222} width={8} height={18} fill={C.hairShadow} />
          <rect x={201} y={237} width={10} height={4} fill={C.red} />
          <rect x={212} y={239} width={10} height={4} fill={C.red} />
          <rect x={201} y={240} width={10} height={1} fill={C.hairShadow} />
          <rect x={212} y={242} width={10} height={1} fill={C.hairShadow} />
        </g>
        <g transform={`translate(${Math.round(Math.sin(frame * 0.04 + 1) * 1)} 0)`}>
          <rect x={248} y={222} width={8} height={17} fill={C.night3} />
          <rect x={259} y={222} width={8} height={19} fill={C.night2} />
          <rect x={247} y={238} width={10} height={4} fill={C.paper} />
          <rect x={258} y={240} width={10} height={4} fill={C.paper} />
          <rect x={247} y={241} width={10} height={1} fill={C.stoneHi} />
          <rect x={258} y={243} width={10} height={1} fill={C.stoneHi} />
        </g>
        <g transform="translate(216 203)">
          <PaperCrane x={0} y={0} frame={frame} scale={1} color={C.paper} glow={false} opacity={0.8} />
        </g>
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={dawn * 0.04} />
      <rect x={0} y={0} width={480} height={270} fill={C.paper} opacity={clamp01((frame - 250) / 20) * 0.18} />
    </SceneSvg>
  );
};

export const RooftopArrival: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  return <Arrival frame={frame} duration={duration} />;
};

export const RooftopTogether: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const internal = duration > 0 ? frame * (266 / duration) : 0;
  return <Together frame={internal} />;
};
