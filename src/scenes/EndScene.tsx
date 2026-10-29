import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp01, mixColor, mulberry32} from '../theme';
import {Cloud, Rain, SceneSvg, StarField} from '../components/Primitives';
import {PaperCrane} from '../components/Characters';

const dawnBands = ['#2a3852', '#46506b', '#6d5d76', '#966b7b', '#c18482', '#e5a087', '#f5bd99', '#fbd4ad', '#ffe4c3', '#fff0d8'];

const CityDawn: React.FC<{frame: number}> = ({frame}) => {
  const rand = mulberry32(303);
  return (
    <g>
      {Array.from({length: 20}, (_, i) => {
        const x = -20 + i * 26;
        const h = 20 + Math.floor(rand() * 45);
        const w = 16 + Math.floor(rand() * 18);
        const top = 196 - h;
        return (
          <g key={i}>
            <rect x={x} y={top} width={w} height={h + 34} fill={i % 3 === 0 ? '#4f3c43' : '#42353d'} />
            <rect x={x} y={top} width={w} height={1} fill={C.orangeHi} opacity={0.12} />
            {Array.from({length: 8}, (_, j) => (
              <rect
                key={j}
                x={x + 3 + (j % 4) * 5}
                y={top + 5 + Math.floor(j / 4) * 8}
                width={2}
                height={2}
                fill={j % 3 ? C.orangeHi : C.cyan}
                opacity={0.18 + (j % 3) * 0.09}
              />
            ))}
            {i % 4 === 0 ? <rect x={x + 7} y={top - 3} width={1} height={3} fill={C.orange} opacity={0.35} /> : null}
          </g>
        );
      })}
      <rect x={0} y={170} width={480} height={28} fill="#c98779" opacity={0.055} />
      {[60, 144, 240, 333, 420].map((x, i) => (
        <rect key={i} x={x} y={205 + (i % 3) * 5} width={4} height={1} fill={C.orangeHi} opacity={0.2} />
      ))}
      {[44, 118, 201, 291, 372, 447].map((x, i) => (
        <g key={`glow-${i}`} opacity={0.22}>
          <rect x={x} y={199 + (i % 3) * 4} width={8} height={1} fill={i % 2 ? C.magenta : C.orangeHi} />
          <rect x={x + 2} y={203 + (i % 3) * 4} width={3} height={1} fill={C.cyan} />
        </g>
      ))}
      <rect x={0} y={212} width={480} height={1} fill={C.orange} opacity={0.15} />
    </g>
  );
};

const Sunrise: React.FC<{frame: number}> = ({frame}) => {
  const pulse = Math.sin(frame * 0.025) * 1;
  const rows = [8, 14, 20, 24, 28, 30, 30, 28, 24, 20, 14, 8];
  return (
    <g>
      <rect x={306} y={108} width={136} height={82} fill={C.orangeHi} opacity={0.04} />
      <rect x={322} y={119} width={104} height={64} fill={C.orangeHi} opacity={0.06} />
      <rect x={338} y={128} width={72} height={48} fill="#ffe6b7" opacity={0.12} />
      {rows.map((w, i) => (
        <rect
          key={i}
          x={374 - Math.floor(w / 2) + pulse}
          y={136 + i * 2}
          width={w}
          height={2}
          fill={i < 3 || i > 9 ? '#ffd39a' : '#fff3d0'}
          opacity={i < 2 || i > 10 ? 0.55 : 0.9}
        />
      ))}
      {[8, 6, 4, 3].map((i) => (
        <rect key={i} x={374 - i * 26} y={168} width={i * 52} height={1} fill={C.orangeHi} opacity={0.08} />
      ))}
      <rect x={356} y={177} width={36} height={2} fill="#ffe1aa" opacity={0.2} />
      {/* low clouds crossing the sun */}
      <g opacity={0.4}>
        <rect x={314} y={154} width={54} height={2} fill="#a76c78" />
        <rect x={326} y={158} width={28} height={1} fill="#bd7d80" />
        <rect x={388} y={162} width={48} height={2} fill="#b2717a" />
        <rect x={400} y={166} width={23} height={1} fill="#c68280" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} opacity={0.55} transform={`translate(${72 + i * 34 + Math.sin(frame * 0.02 + i) * 8} ${78 + i * 9})`}>
          <rect x={0} y={0} width={4} height={1} fill="#3b3344" />
          <rect x={4} y={-2} width={4} height={1} fill="#3b3344" />
          <rect x={7} y={-1} width={3} height={1} fill="#3b3344" />
        </g>
      ))}
    </g>
  );
};

const EndPair: React.FC<{frame: number}> = ({frame}) => {
  const drift = Math.round(Math.sin(frame * 0.04) * 0.8);
  return (
    <g transform={`translate(0 ${drift})`}>
      {/* girl, from behind, sitting on the parapet */}
      <g>
        <rect x={202} y={180} width={12} height={3} fill={C.hair} />
        <rect x={200} y={183} width={16} height={12} fill={C.hair} />
        <rect x={203} y={182} width={10} height={1} fill={C.hairHi} opacity={0.45} />
        <rect x={198} y={181} width={3} height={4} fill={C.cyan} />
        <rect x={215} y={181} width={3} height={4} fill={C.cyan} />
        <rect x={198} y={182} width={20} height={1} fill={C.cyanDim} />
        <rect x={197} y={194} width={22} height={5} fill={C.yellowDim} />
        <rect x={199} y={196} width={18} height={24} fill={C.yellow} />
        <rect x={203} y={201} width={10} height={2} fill={C.yellowHi} opacity={0.35} />
        <rect x={193} y={199} width={4} height={20} fill={C.yellowDim} />
        <rect x={219} y={199} width={4} height={20} fill={C.yellowDim} />
        <rect x={194} y={218} width={3} height={2} fill={C.skin} />
        <rect x={219} y={218} width={3} height={2} fill={C.skinShadow} />
        <rect x={202} y={212} width={3} height={2} fill={C.cyan} opacity={0.8} />
        <rect x={200} y={194} width={2} height={24} fill={C.orange} opacity={0.25} />
        <rect x={214} y={194} width={2} height={24} fill={C.orange} opacity={0.35} />
      </g>
      {/* boy, from behind */}
      <g>
        <rect x={228} y={178} width={12} height={3} fill={C.hair} />
        <rect x={226} y={181} width={16} height={13} fill={C.hair} />
        <rect x={229} y={180} width={10} height={1} fill={C.hairHi} opacity={0.3} />
        <rect x={224} y={180} width={3} height={5} fill={C.orange} />
        <rect x={241} y={180} width={3} height={5} fill={C.orange} />
        <rect x={224} y={181} width={20} height={1} fill={C.orange} />
        <rect x={225} y={194} width={19} height={4} fill={C.red} />
        <rect x={223} y={198} width={22} height={22} fill={C.teal} />
        <rect x={227} y={202} width={14} height={2} fill={C.cyan} opacity={0.2} />
        <rect x={220} y={199} width={4} height={19} fill="#12343d" />
        <rect x={246} y={199} width={3} height={19} fill="#12343d" />
        <rect x={221} y={218} width={3} height={2} fill={C.skinShadow} />
        <rect x={246} y={218} width={3} height={2} fill={C.skinShadow} />
        <rect x={223} y={208} width={2} height={2} fill={C.cyan} opacity={0.55} />
        <rect x={242} y={194} width={1} height={24} fill={C.cyanDim} opacity={0.35} />
      </g>
      {/* rim light from the sunrise */}
      <g opacity={0.5}>
        <rect x={202} y={179} width={11} height={1} fill={C.orangeHi} />
        <rect x={228} y={177} width={11} height={1} fill={C.orangeHi} />
        <rect x={219} y={196} width={1} height={22} fill={C.orangeHi} opacity={0.6} />
        <rect x={245} y={197} width={1} height={20} fill={C.orangeHi} opacity={0.45} />
        <rect x={215} y={181} width={2} height={1} fill={C.cyanHi} />
        <rect x={224} y={180} width={2} height={1} fill={C.orangeHi} />
      </g>
      {/* shared radio and a small light between them */}
      <g transform="translate(220 212)">
        <rect x={0} y={0} width={15} height={9} fill="#0c1118" />
        <rect x={2} y={2} width={11} height={4} fill="#081b17" />
        <rect x={3} y={3} width={7} height={2} fill={C.green} opacity={0.5} />
        <rect x={13} y={2} width={1} height={2} fill={C.cyan} />
      </g>
      <rect x={226} y={210} width={1} height={1} fill={C.cyanHi} />
    </g>
  );
};

const EndWide: React.FC<{frame: number; duration: number}> = ({frame, duration}) => {
  const fade = clamp01(interpolate(frame, [duration - 48, duration - 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));
  const dawn = clamp01(interpolate(frame, [0, 70], [0.45, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <SceneSvg>
      {Array.from({length: dawnBands.length}, (_, i) => (
        <rect key={i} x={0} y={i * 19} width={480} height={21} fill={mixColor('#35425c', dawnBands[i], dawn)} />
      ))}
      <StarField frame={frame} count={25} seed={31} top={0} height={80} opacity={0.2 * (1 - dawn) + 0.04} />
      <g opacity={0.7}>
        <Cloud x={4 + ((frame * 0.02) % 30)} y={47} scale={0.8} color="#b58586" opacity={0.45} />
        <Cloud x={280 + ((frame * 0.012) % 80)} y={27} scale={1.1} color="#c99187" opacity={0.35} />
      </g>
      <Sunrise frame={frame} />
      <CityDawn frame={frame} />
      <Rain frame={frame} count={30} top={0} bottom={230} speed={4} opacity={0.12} seed={52} splash={false} />
      {/* foreground rooftop */}
      <rect x={0} y={216} width={480} height={54} fill="#191b24" />
      <rect x={0} y={220} width={480} height={4} fill="#4a3b41" />
      <rect x={0} y={224} width={480} height={46} fill="#0d1018" />
      <rect x={0} y={228} width={480} height={2} fill="#22262f" />
      {Array.from({length: 10}, (_, i) => (
        <rect key={i} x={(i * 49 + 9) % 480} y={234 + (i % 4) * 7} width={22} height={1} fill="#1c202b" opacity={0.7} />
      ))}
      <EndPair frame={frame} />
      {/* foreground parapet, drawn after them so they read as seated on the edge */}
      <g>
        <rect x={0} y={216} width={480} height={8} fill="#312b31" />
        <rect x={0} y={218} width={480} height={2} fill={C.orangeHi} opacity={0.18} />
        <rect x={0} y={224} width={480} height={46} fill="#0c0f17" />
        <rect x={0} y={224} width={480} height={2} fill="#1e222b" />
        {Array.from({length: 12}, (_, i) => (
          <rect key={i} x={(i * 42 + 6) % 480} y={231 + (i % 4) * 8} width={27} height={1} fill="#181d27" opacity={0.8} />
        ))}
        <rect x={0} y={266} width={480} height={4} fill="#05080f" />
        <g opacity={0.2}>
          <rect x={76} y={238} width={41} height={1} fill={C.cyan} />
          <rect x={354} y={248} width={52} height={1} fill={C.orange} />
        </g>
        {/* rooftop plant and a cat watching the sunrise */}
        <g transform="translate(66 204)">
          <rect x={0} y={8} width={17} height={12} fill="#20191a" />
          <rect x={2} y={8} width={13} height={1} fill="#4a3730" />
          <rect x={3} y={0} width={2} height={9} fill="#20352e" />
          <rect x={7} y={-4} width={2} height={13} fill="#294237" />
          <rect x={11} y={1} width={2} height={8} fill="#1b2e28" />
          <rect x={14} y={4} width={2} height={5} fill="#21382f" />
          <rect x={-2} y={6} width={3} height={5} fill="#1b2e28" />
        </g>
        <g transform="translate(326 198)" opacity={0.9}>
          <rect x={0} y={6} width={16} height={7} fill="#070a10" />
          <rect x={11} y={0} width={7} height={9} fill="#070a10" />
          <rect x={11} y={-3} width={3} height={4} fill="#070a10" />
          <rect x={16} y={-3} width={3} height={4} fill="#070a10" />
          <rect x={12} y={0} width={1} height={1} fill={C.orangeHi} />
          <rect x={17} y={0} width={1} height={1} fill={C.orangeHi} />
          <rect x={-4} y={7} width={5} height={2} fill="#070a10" transform="rotate(-20 -4 8)" />
          <rect x={1} y={12} width={2} height={4} fill="#070a10" />
          <rect x={12} y={12} width={2} height={4} fill="#070a10" />
        </g>
        {/* string bulbs warming the foreground */}
        <g opacity={0.55}>
          <path d="M 0 224 Q 90 236 188 225" fill="none" stroke="#2e2928" strokeWidth={1} />
          {[28, 76, 124, 170].map((x, i) => (
            <g key={i}>
              <rect x={x} y={227 + (i % 2) * 2} width={2} height={2} fill={C.orangeHi} opacity={i % 2 ? 0.6 : 0.85} />
              <rect x={x - 1} y={226 + (i % 2) * 2} width={4} height={4} fill={C.orange} opacity={0.12} />
            </g>
          ))}
        </g>
        <g transform="translate(260 208)">
          <rect x={0} y={0} width={10} height={9} fill="#2a2522" />
          <rect x={1} y={0} width={8} height={1} fill={C.paper} opacity={0.4} />
          <rect x={10} y={2} width={2} height={4} fill="#2a2522" />
          <rect x={2} y={-2} width={2} height={2} fill={C.paper} opacity={0.16} />
        </g>
        {/* legs hanging over the city side */}
        <g transform={`translate(${Math.round(Math.sin(frame * 0.04) * 1)} 0)`}>
          <rect x={205} y={224} width={8} height={15} fill={C.hair} />
          <rect x={214} y={224} width={8} height={17} fill={C.hairShadow} />
          <rect x={203} y={238} width={10} height={4} fill={C.red} />
          <rect x={212} y={240} width={10} height={4} fill={C.red} />
          <rect x={203} y={241} width={10} height={1} fill={C.hairShadow} />
          <rect x={212} y={243} width={10} height={1} fill={C.hairShadow} />
          <rect x={237} y={224} width={8} height={16} fill={C.night3} />
          <rect x={247} y={224} width={8} height={18} fill={C.night2} />
          <rect x={236} y={239} width={10} height={4} fill={C.paper} />
          <rect x={246} y={241} width={10} height={4} fill={C.paper} />
          <rect x={236} y={242} width={10} height={1} fill={C.stoneHi} />
          <rect x={246} y={244} width={10} height={1} fill={C.stoneHi} />
        </g>
      </g>
      <g opacity={0.5}>
        <rect x={64} y={98} width={2} height={116} fill="#2d2f39" />
        <rect x={55} y={131} width={18} height={1} fill="#2d2f39" />
        <rect x={59} y={152} width={14} height={1} fill="#2d2f39" />
        <rect x={64} y={94} width={3} height={3} fill={Math.floor(frame / 18) % 2 ? C.magenta : C.magentaDim} />
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.05} />
      <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={fade} />
    </SceneSvg>
  );
};

const EndSky: React.FC<{frame: number}> = ({frame}) => {
  const t = frame - 120;
  const puffs = Array.from({length: 30}, (_, i) => {
    const x = ((i * 37 + t * 1.9) % 570) - 50;
    const y = 34 + (i % 5) * 17 + Math.sin(i * 2.1) * 5;
    return {x, y, w: 2 + (i % 4), h: i % 7 === 0 ? 3 : 1 + (i % 2)};
  });
  return (
    <SceneSvg>
      {dawnBands.map((color, i) => (
        <rect key={i} x={0} y={i * 19} width={480} height={21} fill={color} />
      ))}
      <Cloud x={20 + ((frame * 0.03) % 60)} y={54} scale={1.5} color="#b58284" opacity={0.55} />
      <Cloud x={236 + ((frame * 0.018) % 100)} y={24} scale={1.9} color="#c8938b" opacity={0.45} />
      <Cloud x={356 + ((frame * 0.012) % 50)} y={88} scale={1.1} color="#d3a092" opacity={0.35} />
      <g opacity={0.35}>
        {puffs.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill={i % 3 === 0 ? '#e1b19f' : '#b98784'} />
        ))}
      </g>
      <Sunrise frame={frame} />
      <CityDawn frame={frame} />
      <Rain frame={frame} count={18} top={0} bottom={210} speed={4} opacity={0.1} seed={61} splash={false} />
      {/* rooftop edge, water tank and laundry in the wind */}
      <rect x={0} y={216} width={480} height={54} fill="#191b24" />
      <rect x={0} y={220} width={480} height={4} fill="#4a3b41" />
      <rect x={0} y={224} width={480} height={46} fill="#0d1018" />
      <g opacity={0.85}>
        <rect x={16} y={132} width={48} height={54} fill="#20212a" />
        <rect x={12} y={128} width={56} height={6} fill="#2e2a31" />
        <rect x={18} y={186} width={3} height={30} fill="#161a23" />
        <rect x={58} y={186} width={3} height={30} fill="#161a23" />
        <rect x={26} y={146} width={28} height={2} fill={C.orange} opacity={0.12} />
      </g>
      <path d="M 76 178 Q 154 188 232 176" fill="none" stroke="#353033" strokeWidth={1} />
      <g transform={`translate(${Math.round(Math.sin(frame * 0.055) * 3)} 0)`}>
        <polygon points="92,180 126,180 121,204 96,204" fill={C.paper} opacity={0.32} />
        <polygon points="94,181 124,181 120,199 98,199" fill="#d8ccb4" opacity={0.22} />
        <polygon points="150,179 182,179 186,202 154,202" fill={C.paper} opacity={0.28} />
        <polygon points="152,180 180,180 184,198 156,198" fill="#d8ccb4" opacity={0.18} />
        <rect x={96} y={178} width={3} height={2} fill="#4b3b30" />
        <rect x={120} y={178} width={3} height={2} fill="#4b3b30" />
        <rect x={154} y={177} width={3} height={2} fill="#4b3b30" />
        <rect x={180} y={177} width={3} height={2} fill="#4b3b30" />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} opacity={0.55}>
          <rect x={282 + i * 20 + Math.sin(frame * 0.03 + i) * 5} y={70 + i * 8} width={4} height={1} fill="#3b3344" />
          <rect x={286 + i * 20 + Math.sin(frame * 0.03 + i) * 5} y={68 + i * 8} width={4} height={1} fill="#3b3344" />
        </g>
      ))}
      <g opacity={0.55}>
        <path d="M 0 224 Q 90 236 188 225" fill="none" stroke="#2e2928" strokeWidth={1} />
        {[28, 76, 124, 170].map((x, i) => (
          <g key={i}>
            <rect x={x} y={227 + (i % 2) * 2} width={2} height={2} fill={C.orangeHi} opacity={i % 2 ? 0.6 : 0.85} />
            <rect x={x - 1} y={226 + (i % 2) * 2} width={4} height={4} fill={C.orange} opacity={0.12} />
          </g>
        ))}
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.04} />
    </SceneSvg>
  );
};

const EndMemory: React.FC<{frame: number}> = ({frame}) => {
  const t = frame - 242;
  const sway = Math.sin(t * 0.05) * 0.6;
  return (
    <SceneSvg>
      <rect width={480} height={270} fill="#141117" />
      <rect x={0} y={0} width={480} height={210} fill="#1d1820" />
      <rect x={0} y={210} width={480} height={60} fill="#0e0c10" />
      <g opacity={0.26}>
        {[36, 76, 126, 392, 438].map((x, i) => (
          <g key={i}>
            <rect x={x} y={20 + (i % 3) * 34} width={24 + (i % 2) * 16} height={5} fill={i % 2 ? C.orange : C.paper} />
            <rect x={x + 8} y={26 + (i % 3) * 34} width={6} height={38 + i * 8} fill={C.orangeHi} opacity={0.12} />
          </g>
        ))}
      </g>
      <rect x={0} y={210} width={480} height={3} fill="#443b37" />
      <rect x={0} y={213} width={480} height={57} fill="#17151a" />
      {Array.from({length: 10}, (_, i) => (
        <rect key={i} x={(i * 53 + 12) % 470} y={224 + (i % 4) * 8} width={28} height={1} fill="#24222a" />
      ))}
      {/* a Polaroid of the rooftop, lying on the ledge */}
      <g transform={`translate(232 126) rotate(${-3 + sway})`}>
        <rect x={-98} y={-110} width={196} height={220} fill="#050407" opacity={0.45} transform="translate(5 7)" />
        <rect x={-98} y={-110} width={196} height={220} fill="#d8cbb2" />
        <rect x={-84} y={-96} width={168} height={150} fill="#8d7061" />
        {['#3f4760', '#5c586e', '#8a6d7b', '#b98586', '#dca18e', '#f0c09f'].map((color, i) => (
          <rect key={i} x={-82} y={-94 + i * 25} width={164} height={26} fill={color} />
        ))}
        <rect x={55} y={-72} width={16} height={2} fill="#ffe4b5" opacity={0.95} />
        <rect x={51} y={-70} width={24} height={2} fill="#ffe4b5" opacity={0.95} />
        <rect x={49} y={-68} width={28} height={12} fill="#ffe4b5" opacity={0.9} />
        <rect x={51} y={-56} width={24} height={2} fill="#ffe4b5" opacity={0.8} />
        <rect x={55} y={-54} width={16} height={2} fill="#ffe4b5" opacity={0.6} />
        <g opacity={0.9}>
          {Array.from({length: 12}, (_, i) => {
            const x = -80 + i * 15;
            const h = 14 + (i % 4) * 8;
            return <rect key={i} x={x} y={38 - h} width={12 + (i % 3) * 3} height={h} fill="#4d3a41" />;
          })}
        </g>
        <rect x={-84} y={38} width={168} height={8} fill="#3d3037" />
        <g opacity={0.9}>
          <rect x={-30} y={13} width={9} height={9} fill={C.hair} />
          <rect x={-33} y={20} width={15} height={24} fill={C.yellow} />
          <rect x={-10} y={11} width={9} height={9} fill={C.hair} />
          <rect x={-13} y={19} width={15} height={25} fill={C.teal} />
          <rect x={-34} y={10} width={17} height={1} fill={C.orangeHi} opacity={0.6} />
          <rect x={-15} y={8} width={17} height={1} fill={C.orangeHi} opacity={0.6} />
        </g>
        <path d="M -84 8 Q -40 16 0 7 Q 40 -2 84 8" fill="none" stroke="#e2b58e" strokeWidth={1} opacity={0.5} />
        <text x={0} y={78} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={8} fill="#5c4b3f">
          天台 · 清晨
        </text>
        <text x={0} y={94} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={5} fill="#8b7564">
          同類
        </text>
      </g>
      {/* a mug and the paper crane beside the photo */}
      <g transform="translate(74 190)">
        <rect x={0} y={0} width={22} height={24} fill="#4a3a30" />
        <rect x={2} y={2} width={18} height={3} fill="#231a15" />
        <rect x={2} y={16} width={18} height={3} fill={C.paper} opacity={0.18} />
        <rect x={22} y={5} width={5} height={10} fill="#4a3a30" />
        <rect x={3} y={0} width={16} height={1} fill={C.paper} opacity={0.35} />
      </g>
      <g transform="translate(340 186)">
        <PaperCrane x={0} y={0} frame={frame} scale={2.1} color={C.paper} glow={false} />
      </g>
      <g transform="translate(108 222) rotate(-7)">
        <rect x={0} y={0} width={36} height={14} fill="#c8bda3" opacity={0.55} />
        <rect x={3} y={3} width={18} height={1} fill="#6b5b47" opacity={0.5} />
        <rect x={3} y={7} width={11} height={1} fill="#6b5b47" opacity={0.35} />
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.035} />
    </SceneSvg>
  );
};

const EndCrane: React.FC<{frame: number; duration: number}> = ({frame, duration}) => {
  const p = clamp01((frame - 338) / 188);
  const fade = clamp01(interpolate(frame, [duration - 48, duration - 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));
  const craneX = 244 + 178 * p + Math.sin(p * 7) * 9;
  const craneY = 196 - 176 * p + Math.cos(p * 5) * 7;
  const craneRot = -8 + p * 228 + Math.sin(p * 9) * 14;
  const craneScale = 2.05 - 1.35 * p;
  const wind = Array.from({length: 26}, (_, i) => {
    const x = ((i * 41 + frame * 2.2) % 540) - 30;
    const y = 20 + (i % 6) * 33 + Math.sin(i * 1.8) * 6;
    return {x, y, w: 10 + (i % 4) * 8};
  });
  return (
    <SceneSvg>
      {dawnBands.map((color, i) => (
        <rect key={i} x={0} y={i * 19} width={480} height={21} fill={color} />
      ))}
      <Cloud x={-10 + ((frame * 0.025) % 70)} y={48} scale={1.35} color="#c08b86" opacity={0.4} />
      <Cloud x={280 + ((frame * 0.016) % 80)} y={26} scale={1.6} color="#d09a8f" opacity={0.32} />
      <Sunrise frame={frame} />
      <CityDawn frame={frame} />
      <Rain frame={frame} count={22} top={0} bottom={210} speed={4} opacity={0.1} seed={63} splash={false} />
      {/* wind and loose paper across the roof */}
      <g opacity={0.22}>
        {wind.map((w, i) => (
          <rect key={i} x={w.x} y={w.y} width={w.w} height={1} fill={i % 3 === 0 ? C.paper : C.orangeHi} />
        ))}
      </g>
      <g opacity={0.3}>
        {[0, 1, 2, 3, 4].map((i) => {
          const x = ((i * 79 + frame * 1.1) % 500) - 10;
          const y = 130 + Math.sin(frame * 0.04 + i) * 24 + i * 9;
          return <rect key={i} x={x} y={y} width={4} height={2} fill={i % 2 ? C.brown : C.orange} transform={`rotate(${frame * 2 + i * 50} ${x} ${y})`} />;
        })}
      </g>
      {/* the ledge and the small things left on it */}
      <rect x={0} y={216} width={480} height={54} fill="#191b24" />
      <rect x={0} y={220} width={480} height={4} fill="#4a3b41" />
      <rect x={0} y={224} width={480} height={46} fill="#0d1018" />
      <rect x={0} y={228} width={480} height={2} fill="#22262f" />
      {Array.from({length: 10}, (_, i) => (
        <rect key={i} x={(i * 49 + 9) % 480} y={234 + (i % 4) * 7} width={22} height={1} fill="#1c202b" opacity={0.7} />
      ))}
      <g transform="translate(118 196)">
        <rect x={0} y={0} width={18} height={20} fill="#4a3a30" />
        <rect x={2} y={2} width={14} height={2} fill="#231a15" />
        <rect x={18} y={4} width={4} height={8} fill="#4a3a30" />
        <rect x={2} y={0} width={14} height={1} fill={C.paper} opacity={0.3} />
      </g>
      <g transform="translate(158 212)">
        <rect x={0} y={0} width={28} height={14} fill="#201d1b" />
        <rect x={2} y={2} width={24} height={10} fill="#302c27" />
        <circle cx={8} cy={7} r={3} fill="#0d0c0b" />
        <circle cx={20} cy={7} r={3} fill="#0d0c0b" />
        <rect x={2} y={11} width={12} height={1} fill={C.paper} opacity={0.25} />
      </g>
      {/* the paper crane, carried off by the wind */}
      <g transform={`translate(${craneX} ${craneY}) rotate(${craneRot}) scale(${craneScale})`}>
        <PaperCrane x={0} y={0} frame={frame} scale={1} color={C.paper} glow={false} />
      </g>
      <g opacity={0.55}>
        <path d="M 0 224 Q 90 236 188 225" fill="none" stroke="#2e2928" strokeWidth={1} />
        {[28, 76, 124, 170].map((x, i) => (
          <g key={i}>
            <rect x={x} y={227 + (i % 2) * 2} width={2} height={2} fill={C.orangeHi} opacity={i % 2 ? 0.6 : 0.85} />
            <rect x={x - 1} y={226 + (i % 2) * 2} width={4} height={4} fill={C.orange} opacity={0.12} />
          </g>
        ))}
      </g>
      <g opacity={0.55}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${292 + i * 20 + Math.sin(frame * 0.03 + i) * 5} ${58 + i * 8})`}>
            <rect x={0} y={0} width={4} height={1} fill="#3b3344" />
            <rect x={4} y={-2} width={4} height={1} fill="#3b3344" />
            <rect x={7} y={-1} width={3} height={1} fill="#3b3344" />
          </g>
        ))}
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.05} />
      <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={fade} />
    </SceneSvg>
  );
};

const EndCloudCut: React.FC<{frame: number}> = ({frame}) => {
  const p = clamp01((frame - 116) / 54);
  const gap = 8 + p * 12;
  const ys = [48, 70, 92, 114, 136, 158, 180];
  const jitter = [0, -4, 2, -3, 3, -2, 2];
  const left = ys.map((y, i) => [242 + jitter[i], y] as const);
  const right = ys.map((y, i) => [242 + gap + jitter[i], y] as const);
  const cutPoints = [...left, ...[...right].reverse()].map(([x, y]) => `${x},${y}`).join(' ');
  const leftLine = left.map(([x, y]) => `${x},${y}`).join(' ');
  const rightLine = right.map(([x, y]) => `${x},${y}`).join(' ');
  const puffs = Array.from({length: 18}, (_, i) => {
    const age = (i / 18 + p * 0.7) % 1;
    return {
      x: 238 + age * 46 + (i % 3) * 7,
      y: 72 + (i % 7) * 15 - age * 10,
      s: 0.28 + (i % 3) * 0.14,
      o: 0.6 - (i % 3) * 0.09,
    };
  });
  return (
    <SceneSvg>
      {dawnBands.map((color, i) => (
        <rect key={i} x={0} y={i * 19} width={480} height={21} fill={color} />
      ))}
      <rect x={342} y={44} width={80} height={58} fill="#ffe3b8" opacity={0.12} />
      <rect x={360} y={58} width={44} height={32} fill="#ffe9c5" opacity={0.2} />
      <g opacity={0.4}>
        <Cloud x={22} y={58} scale={1.2} color="#d8a091" opacity={0.5} />
        <Cloud x={386} y={44} scale={0.9} color="#d8a091" opacity={0.4} />
      </g>
      <defs>
        <mask id="cloud-cut-mask" maskUnits="userSpaceOnUse" x={0} y={0} width={480} height={270}>
          <rect width={480} height={270} fill="white" />
          <polygon points={cutPoints} fill="black" />
        </mask>
      </defs>
      {/* one cloud, sliced by the gust */}
      <g mask="url(#cloud-cut-mask)">
        <Cloud x={128} y={90} scale={4.6} color="#b98786" />
        <Cloud x={140} y={84} scale={4.0} color="#c8948d" />
        <Cloud x={154} y={78} scale={3.1} color="#d8a395" />
        <Cloud x={178} y={72} scale={2.2} color="#efc7ad" />
        <Cloud x={80} y={132} scale={2.2} color="#c8948d" opacity={0.75} />
        <Cloud x={362} y={122} scale={2.5} color="#c8948d" opacity={0.7} />
      </g>
      <polyline points={leftLine} fill="none" stroke="#f8dcc0" strokeWidth={1.2} opacity={0.85} />
      <polyline points={rightLine} fill="none" stroke="#f8dcc0" strokeWidth={1.2} opacity={0.75} />
      <g opacity={0.6}>
        {puffs.map((f, i) => (
          <Cloud key={i} x={f.x} y={f.y} scale={f.s} color={i % 2 ? '#efc6ad' : '#f9dfc4'} opacity={f.o} />
        ))}
      </g>
      {/* a gust crossing the cut */}
      <g opacity={0.45}>
        <line x1={126} y1={54} x2={356} y2={178} stroke={C.paper} strokeWidth={1} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={108 - i * 8} y1={68 + i * 10} x2={338 - i * 8} y2={192 + i * 10} stroke={C.paper} strokeWidth={1} opacity={0.3} />
        ))}
      </g>
      <CityDawn frame={frame} />
      <Rain frame={frame} count={18} top={0} bottom={210} speed={4} opacity={0.08} seed={61} splash={false} />
      {/* rooftop edge and water tank, aligned with the wide shot */}
      <rect x={0} y={216} width={480} height={54} fill="#191b24" />
      <rect x={0} y={220} width={480} height={4} fill="#4a3b41" />
      <rect x={0} y={224} width={480} height={46} fill="#0d1018" />
      <g opacity={0.85}>
        <rect x={16} y={132} width={48} height={54} fill="#20212a" />
        <rect x={12} y={128} width={56} height={6} fill="#2e2a31" />
        <rect x={18} y={186} width={3} height={30} fill="#161a23" />
        <rect x={58} y={186} width={3} height={30} fill="#161a23" />
        <rect x={26} y={146} width={28} height={2} fill={C.orange} opacity={0.12} />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} opacity={0.55}>
          <rect x={292 + i * 20 + Math.sin(frame * 0.03 + i) * 5} y={70 + i * 8} width={4} height={1} fill="#3b3344" />
          <rect x={296 + i * 20 + Math.sin(frame * 0.03 + i) * 5} y={68 + i * 8} width={4} height={1} fill="#3b3344" />
        </g>
      ))}
      <g opacity={0.55}>
        <path d="M 0 224 Q 90 236 188 225" fill="none" stroke="#2e2928" strokeWidth={1} />
        {[28, 76, 124, 170].map((x, i) => (
          <g key={i}>
            <rect x={x} y={227 + (i % 2) * 2} width={2} height={2} fill={C.orangeHi} opacity={i % 2 ? 0.6 : 0.85} />
            <rect x={x - 1} y={226 + (i % 2) * 2} width={4} height={4} fill={C.orange} opacity={0.12} />
          </g>
        ))}
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.04} />
    </SceneSvg>
  );
};

export const EndScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  if (frame < 52) return <EndWide frame={frame} duration={duration} />;
  if (frame < 136) {
    const raw = clamp01((frame - 52) / 84);
    const t = raw * raw * (3 - 2 * raw);
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{opacity: 1 - t, transform: `scale(${1 + 0.06 * t}) translateY(${-12 * t}px)`}}>
          <EndWide frame={frame} duration={duration} />
        </AbsoluteFill>
        <AbsoluteFill style={{opacity: t, transform: `scale(${1.04 - 0.02 * t})`}}>
          <EndCloudCut frame={frame} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 46%, rgba(247,220,196,0.22), transparent 68%)',
            opacity: Math.sin(Math.PI * t) * 0.9,
          }}
        />
      </AbsoluteFill>
    );
  }
  if (frame < 166) return <EndCloudCut frame={frame} />;
  if (frame < 184) {
    const t = clamp01((frame - 166) / 18);
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{opacity: 1 - t}}>
          <EndCloudCut frame={frame} />
        </AbsoluteFill>
        <AbsoluteFill style={{opacity: t}}>
          <EndSky frame={frame} />
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }
  if (frame < 242) return <EndSky frame={frame} />;
  if (frame < 338) return <EndMemory frame={frame} />;
  return <EndCrane frame={frame} duration={duration} />;
};
