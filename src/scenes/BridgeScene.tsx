import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, clamp01, mixColor, mulberry32} from '../theme';
import {Cloud, SceneSvg, StarField} from '../components/Primitives';
import {PaperCrane} from '../components/Characters';

const CityBelow: React.FC<{frame: number; dawn: number}> = ({frame, dawn}) => {
  const rand = mulberry32(517);
  return (
    <g>
      <rect x={0} y={92} width={480} height={72} fill={mixColor('#0b1424', '#5d494c', dawn)} />
      {Array.from({length: 18}, (_, i) => {
        const x = -16 + i * 30;
        const h = 18 + Math.floor(rand() * 42);
        const top = 160 - h;
        return (
          <g key={i}>
            <rect x={x} y={top} width={20 + (i % 4) * 6} height={h + 4} fill={mixColor('#101c2f', '#4d3b42', dawn)} />
            {Array.from({length: 8}, (_, j) => (
              <rect
                key={j}
                x={x + 3 + (j % 4) * 6}
                y={top + 4 + Math.floor(j / 4) * 8}
                width={1}
                height={2}
                fill={j % 4 === 0 ? '#e0bc82' : '#b9765d'}
                opacity={0.18 + (j % 3) * 0.1}
              />
            ))}
            {i % 6 === 0 ? <rect x={x + 8} y={top - 4} width={1} height={4} fill={C.orange} opacity={0.3} /> : null}
          </g>
        );
      })}
      <rect x={0} y={154} width={480} height={10} fill={mixColor('#1a2436', '#6b4c51', dawn)} opacity={0.5} />
    </g>
  );
};

const Steam: React.FC<{frame: number; x: number; y: number; seed: number}> = ({frame, x, y, seed}) => (
  <g opacity={0.12}>
    {[0, 1, 2, 3].map((i) => {
      const age = ((frame + i * 19 + seed) % 74) / 74;
      return (
        <g key={i} opacity={(1 - age) * 0.55}>
          <rect
            x={x + Math.round(Math.sin(age * 4 + i + seed) * 4)}
            y={y - age * 32}
            width={3 + Math.round(age * 5)}
            height={1}
            fill={C.paper}
          />
        </g>
      );
    })}
  </g>
);

const Mug: React.FC<{x: number; y: number; w: number; h: number; dark: string; light: string}> = ({x, y, w, h, dark, light}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={dark} />
    <rect x={x + 2} y={y + 3} width={w - 4} height={3} fill={C.black} opacity={0.3} />
    <rect x={x + 2} y={y + h - 5} width={w - 4} height={2} fill={light} opacity={0.25} />
    <rect x={x + w} y={y + 6} width={6} height={h - 11} fill={dark} />
    <rect x={x + w + 1} y={y + 8} width={4} height={h - 15} fill={C.black} opacity={0.25} />
    <rect x={x + 3} y={y} width={w - 6} height={1} fill={light} opacity={0.55} />
  </g>
);

export const BridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 212;
  const dawn = clamp01(frame / (duration - 10));
  const fadeIn = clamp01(frame / 18);
  const fadeOut = clamp01((frame - 190) / 22);
  const planeX = -40 + ((frame * 1.05) % 560);
  const cableSway = Math.round(Math.sin(frame * 0.035) * 1);

  return (
    <SceneSvg>
      {['#050a15', '#08101f', '#0b1527', '#111d33', '#182642', '#243552', '#30405c'].map((color, i) => (
        <rect key={i} x={0} y={i * 24} width={480} height={26} fill={mixColor(color, i > 2 ? '#6b5559' : color, dawn * 0.55)} />
      ))}
      <StarField frame={frame} count={50} seed={23} top={0} height={100} opacity={0.45 * (1 - dawn * 0.75)} />
      <g opacity={0.52}>
        <Cloud x={8 + ((frame * 0.018) % 38)} y={35} scale={0.85} color={mixColor('#14203a', '#b98784', dawn)} />
        <Cloud x={264 + ((frame * 0.012) % 80)} y={18} scale={1.15} color={mixColor('#19263f', '#c08d84', dawn)} />
        <Cloud x={140 + ((frame * 0.01) % 50)} y={69} scale={0.55} color={mixColor('#1c2b45', '#aa7c7d', dawn)} />
      </g>
      {/* a real plane crossing the early sky */}
      <g opacity={0.36}>
        <rect x={planeX - 30} y={51} width={30} height={1} fill={C.paper} opacity={0.14} />
        <rect x={planeX} y={49} width={11} height={3} fill="#2d2d37" />
        <rect x={planeX + 7} y={47} width={4} height={1} fill="#2d2d37" />
        <rect x={planeX + 9} y={52} width={4} height={1} fill="#2d2d37" />
        <rect x={planeX + 10} y={52} width={1} height={1} fill={frame % 30 < 4 ? C.red : C.magentaDim} />
      </g>
      <CityBelow frame={frame} dawn={dawn} />

      {/* the rooftop ledge, in close-up */}
      <rect x={0} y={160} width={480} height={110} fill="#1a1a22" />
      <rect x={0} y={160} width={480} height={9} fill="#46413e" />
      <rect x={0} y={162} width={480} height={2} fill="#746a62" opacity={0.65} />
      <rect x={0} y={169} width={480} height={3} fill="#26252b" />
      <rect x={0} y={172} width={480} height={98} fill="#121319" />
      {Array.from({length: 14}, (_, i) => (
        <rect key={i} x={(i * 37 + 6) % 480} y={180 + (i % 4) * 8} width={26} height={1} fill="#24242c" opacity={0.8} />
      ))}
      <rect x={0} y={232} width={480} height={2} fill="#08090d" />
      <rect x={39} y={186} width={33} height={1} fill={C.paper} opacity={0.07} />
      <rect x={398} y={194} width={39} height={1} fill={C.paper} opacity={0.05} />
      {/* wet sheen and the reflected city */}
      <rect x={18} y={186} width={444} height={48} fill="#080d14" opacity={0.55} />
      <rect x={28} y={190} width={126} height={2} fill={C.orange} opacity={0.06} />
      <rect x={180} y={196} width={96} height={2} fill={C.orangeHi} opacity={0.05} />
      <rect x={314} y={188} width={108} height={2} fill={C.cyan} opacity={0.04} />
      <g opacity={0.5}>
        {[104, 108, 111, 238, 241, 245, 356, 360, 184, 188].map((x, i) => (
          <g key={i}>
            <rect x={x} y={178 + (i % 3) * 4} width={i % 2 ? 2 : 1} height={12 + (i % 4) * 5} fill={i > 5 ? C.paper : C.orangeHi} opacity={0.1} />
            <rect x={x} y={198 + (i % 3) * 3} width={1} height={8 + (i % 3) * 4} fill={i > 5 ? C.paper : C.orange} opacity={0.07} />
          </g>
        ))}
      </g>
      {Array.from({length: 13}, (_, i) => (
        <rect key={i} x={42 + i * 32} y={204 + (i % 4) * 9} width={7 + (i % 3) * 5} height={1} fill={C.paper} opacity={0.05} />
      ))}
      <g opacity={0.22}>
        {Array.from({length: 16}, (_, i) => (
          <rect key={i} x={16 + i * 29} y={196 + (i % 5) * 8} width={1} height={4 + (i % 4) * 3} fill={C.blueHi} />
        ))}
      </g>
      <rect x={0} y={176} width={480} height={7} fill={C.paper} opacity={0.025} />
      <rect x={86} y={210} width={64} height={1} fill={C.orangeHi} opacity={0.06} />
      <rect x={300} y={218} width={84} height={1} fill={C.cyanHi} opacity={0.04} />

      {/* the two mugs */}
      <Mug x={98} y={130} w={28} h={30} dark="#4b3b30" light={C.paper} />
      <Mug x={352} y={134} w={24} h={26} dark="#30322b" light={C.paper} />
      <Steam frame={frame} x={110} y={128} seed={3} />
      <Steam frame={frame} x={362} y={132} seed={9} />

      {/* the cassette player and the shared earbud */}
      <g transform="translate(226 126)">
        <rect x={0} y={0} width={48} height={34} fill="#1b1c1c" />
        <rect x={2} y={2} width={44} height={30} fill="#30302b" />
        <rect x={5} y={6} width={38} height={15} fill="#0e1110" />
        <circle cx={14} cy={13} r={5} fill="#070908" />
        <circle cx={14} cy={13} r={2} fill={C.paper} opacity={0.4} />
        <circle cx={34} cy={13} r={5} fill="#070908" />
        <circle cx={34} cy={13} r={2} fill={C.paper} opacity={0.4} />
        <rect x={6} y={25} width={22} height={1} fill={C.paper} opacity={0.35} />
        <rect x={30} y={25} width={12} height={1} fill={C.paper} opacity={0.2} />
        <rect x={44} y={4} width={2} height={26} fill="#5d574c" opacity={0.5} />
        <rect x={2} y={2} width={44} height={1} fill={C.paper} opacity={0.2} />
      </g>
      <path
        d={`M 274 146 Q 292 ${152 + cableSway} 316 154`}
        fill="none"
        stroke={C.paper}
        strokeWidth={1}
        opacity={0.55}
      />
      <rect x={315} y={152} width={3} height={5} fill={C.paper} opacity={0.8} />
      <rect x={316} y={153} width={1} height={3} fill="#5f5a50" />

      {/* the real paper crane */}
      <g transform="translate(174 137)">
        <PaperCrane x={0} y={0} frame={frame} scale={2.1} color={C.paper} glow={false} />
      </g>
      {/* a transfer ticket under the crane */}
      <g transform="translate(156 151) rotate(-6)">
        <rect x={0} y={0} width={32} height={12} fill="#c8bda3" opacity={0.5} />
        <rect x={3} y={3} width={16} height={1} fill="#6b5b47" opacity={0.5} />
        <rect x={3} y={6} width={10} height={1} fill="#6b5b47" opacity={0.35} />
      </g>

      {/* small string lights above another roof */}
      <path d="M 0 108 Q 122 120 240 108 Q 360 96 480 112" fill="none" stroke="#2c2c32" strokeWidth={1} />
      {[22, 76, 132, 188, 246, 304, 360, 420, 470].map((x, i) => (
        <g key={i}>
          <rect x={x} y={110 + Math.round(Math.sin((x / 480) * Math.PI) * 4)} width={1} height={2} fill="#3b3630" />
          <rect x={x - 1} y={112 + Math.round(Math.sin((x / 480) * Math.PI) * 4)} width={3} height={2} fill={i % 4 === 0 ? C.orangeHi : C.paper} opacity={0.5} />
        </g>
      ))}

      <rect x={0} y={160} width={480} height={1} fill={C.orangeHi} opacity={0.16 + dawn * 0.2} />
      {Array.from({length: 34}, (_, i) => {
        const x = (i * 41 + ((frame * 2 + i * 13) % 37)) % 480;
        const y = 18 + ((i * 23 + frame * 5) % 225);
        return <rect key={i} x={x} y={y} width={1} height={4 + (i % 4) * 2} fill={C.paper} opacity={0.07 + (i % 3) * 0.02} />;
      })}
      <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={1 - fadeIn} />
      <rect x={0} y={0} width={480} height={270} fill="#f7e6c9" opacity={fadeOut * 0.45} />
    </SceneSvg>
  );
};
