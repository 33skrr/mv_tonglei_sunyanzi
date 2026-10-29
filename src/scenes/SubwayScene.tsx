import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp01, stepClock} from '../theme';
import {Boy, Girl, PaperCrane} from '../components/Characters';
import {Dither, PixelLabel, SceneSvg} from '../components/Primitives';

const windows = [
  {x: 24, w: 165},
  {x: 291, w: 165},
];

const Interior: React.FC<{
  frame: number;
  boyOpacity: number;
  craneOnSeat: boolean;
  warmth?: number;
}> = ({frame, boyOpacity, craneOnSeat, warmth = 0}) => {
  const sway = Math.round(Math.sin(frame * 0.08) * 0.9);
  const strapSwing = Math.round(Math.sin(frame * 0.07) * 1.2);
  const lightFlicker = (frame > 60 && frame < 63) || (frame > 284 && frame < 286) ? 0.55 : 1;
  const speed = 8;
  const streaks = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <g transform={`translate(${sway} 0)`}>
      <rect width={480} height={270} fill="#15171a" />
      {/* ceiling */}
      <rect x={0} y={0} width={480} height={35} fill="#24251f" />
      <rect x={0} y={28} width={480} height={7} fill="#171813" />
      <rect x={28} y={8} width={166} height={9} fill="#0d0e0b" />
      <rect x={32} y={10} width={158} height={5} fill="#dfe7cf" opacity={0.85 * lightFlicker} />
      <rect x={32} y={8} width={158} height={1} fill={C.orange} opacity={0.5} />
      <rect x={286} y={8} width={166} height={9} fill="#0d0e0b" />
      <rect x={290} y={10} width={158} height={5} fill="#e3e6cb" opacity={0.78 * lightFlicker} />
      <rect x={290} y={8} width={158} height={1} fill={C.orange} opacity={0.5} />
      {[38, 114, 300, 390].map((x, i) => (
        <rect key={i} x={x} y={0} width={1} height={8} fill="#474538" opacity={0.7} />
      ))}
      <rect x={218} y={9} width={44} height={13} fill="#171914" />
      <rect x={221} y={12} width={38} height={7} fill="#0b0c09" />
      {Array.from({length: 8}, (_, i) => (
        <rect key={i} x={226 + i * 4} y={13} width={2} height={1} fill="#33352b" />
      ))}
      {/* walls */}
      <rect x={0} y={35} width={480} height={139} fill="#5c5748" />
      <rect x={0} y={35} width={480} height={8} fill="#38392f" />
      <rect x={0} y={43} width={480} height={9} fill="#1c1d18" />
      <rect x={0} y={44} width={480} height={1} fill={C.orange} opacity={0.2} />
      {Array.from({length: 17}, (_, i) => (
        <rect key={i} x={18 + i * 28} y={47} width={2} height={2} fill={i % 4 === 0 ? C.orange : C.cyanDim} opacity={i % 4 === 0 ? 0.7 : 0.35} />
      ))}
      <text x={240} y={51} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={5} fill={C.paper} opacity={0.6}>
        末班 · 终点站方向
      </text>
      <rect x={0} y={135} width={480} height={3} fill="#292a23" />
      <rect x={0} y={138} width={480} height={2} fill="#6f6853" opacity={0.5} />
      <rect x={0} y={169} width={480} height={12} fill="#393a31" />
      <rect x={0} y={181} width={480} height={35} fill="#272821" />
      <rect x={0} y={169} width={480} height={1} fill="#78705a" opacity={0.35} />
      {/* windows */}
      {windows.map((win, wi) => (
        <g key={wi}>
          <rect x={win.x - 4} y={51} width={win.w + 8} height={84} fill="#26261e" />
          <rect x={win.x} y={55} width={win.w} height={76} fill="#07101a" />
          <rect x={win.x} y={55} width={win.w} height={4} fill="#0a121e" />
          <g>
            {streaks.map((s, i) => {
              const offset = (frame * (speed + i * 1.4) + i * 97 + wi * 53) % 400;
              return (
                <rect
                  key={i}
                  x={win.x - 50 + offset}
                  y={68 + (i % 5) * 12}
                  width={20 + (i % 4) * 19}
                  height={i % 3 === 0 ? 2 : 1}
                  fill={i % 4 === 0 ? C.cyan : i % 5 === 0 ? C.magenta : C.blueHi}
                  opacity={0.15 + (i % 4) * 0.12}
                />
              );
            })}
            <rect x={win.x + 22} y={58} width={1} height={70} fill="#0d1a2a" opacity={0.6} />
            <rect x={win.x + 91} y={55} width={2} height={76} fill="#141f2d" />
            <rect x={win.x + 91} y={55} width={1} height={76} fill="#263a50" opacity={0.6} />
            {[62, 60, 58, 61].map((val, i) => (
              <rect key={i} x={win.x + 12 + i * 35} y={62} width={1} height={val} fill={C.cyanHi} opacity={0.03} />
            ))}
            {/* water trails on glass */}
            {[24, 61, 113, 142].map((x, i) => (
              <g key={i} opacity={0.18}>
                <rect x={win.x + x} y={70 + ((frame * 0.3 + i * 17) % 52)} width={1} height={4 + i * 2} fill={C.cyanHi} />
                <rect x={win.x + x + 1} y={89 + ((frame * 0.18 + i * 11) % 38)} width={1} height={2} fill={C.blueHi} />
              </g>
            ))}
          </g>
          <rect x={win.x} y={55} width={win.w} height={76} fill={C.night3} opacity={0.08} />
          {/* window frame and sill */}
          <rect x={win.x - 4} y={51} width={win.w + 8} height={4} fill="#383a31" />
          <rect x={win.x - 4} y={131} width={win.w + 8} height={4} fill="#3d3e34" />
          <rect x={win.x - 4} y={51} width={4} height={84} fill="#34362e" />
          <rect x={win.x + win.w} y={51} width={4} height={84} fill="#34362e" />
          <rect x={win.x - 4} y={133} width={win.w + 8} height={2} fill={C.orange} opacity={0.12} />
          {wi === 0 ? (
            <g transform={`translate(${win.x + 6} 40)`}>
              <rect x={0} y={0} width={68} height={9} fill="#15170f" />
              <rect x={2} y={2} width={64} height={5} fill="#2f2f22" />
              <text x={34} y={7} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={5} fill={C.orangeHi} opacity={0.75}>
                夜班車
              </text>
            </g>
          ) : (
            <g transform={`translate(${win.x + 91} 40)`}>
              <rect x={0} y={0} width={68} height={9} fill="#15170f" />
              <rect x={2} y={2} width={64} height={5} fill="#2f2f22" />
              <text x={34} y={7} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={5} fill={C.paper} opacity={0.6}>
                末班 · 回家
              </text>
            </g>
          )}
        </g>
      ))}
      {/* center paper poster */}
      <g>
        <rect x={190} y={47} width={100} height={104} fill="#16110c" />
        <rect x={192} y={48} width={96} height={101} fill="#6f5841" />
        <rect x={195} y={51} width={90} height={95} fill="#cabda5" />
        <rect x={196} y={52} width={88} height={1} fill="#8b765c" opacity={0.5} />
        <rect x={196} y={143} width={88} height={1} fill="#8b765c" opacity={0.5} />
        <rect x={205} y={61} width={70} height={47} fill="#d8ccb4" />
        <circle cx={240} cy={82} r={17} fill="#4b3b30" />
        <circle cx={240} cy={82} r={5} fill="#d8ccb4" />
        <rect x={226} y={69} width={11} height={1} fill="#8b765c" opacity={0.55} />
        <rect x={208} y={114} width={64} height={1} fill="#8b765c" opacity={0.5} />
        <text x={240} y={127} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={8} fill="#4b3b30">
          回聲唱片
        </text>
        <text x={240} y={138} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={5} fill="#725b49">
          夜間電台 · 週五 22:00
        </text>
        <rect x={192} y={48} width={1} height={101} fill="#3b2d22" opacity={0.5} />
        <rect x={287} y={48} width={1} height={101} fill="#3b2d22" opacity={0.5} />
        <g opacity={0.35}>
          <rect x={188} y={44} width={2} height={2} fill={C.orange} />
          <rect x={288} y={46} width={2} height={2} fill={C.magenta} />
          <rect x={188} y={148} width={2} height={2} fill={C.magenta} />
        </g>
      </g>
      {/* cool light spilling in from the windows */}
      <rect x={0} y={55} width={480} height={76} fill={C.cyan} opacity={0.026} />
      <rect x={20} y={132} width={190} height={28} fill={C.cyan} opacity={0.022} />
      <rect x={270} y={132} width={190} height={28} fill={C.cyan} opacity={0.022} />
      <g opacity={0.14}>
        <path d="M 28 60 L 74 131 L 76 131 L 32 60 Z" fill={C.cyanHi} />
        <path d="M 61 60 L 107 131 L 108 131 L 64 60 Z" fill={C.cyanHi} />
        <path d="M 319 60 L 365 131 L 366 131 L 322 60 Z" fill={C.cyanHi} />
        <path d="M 380 60 L 426 131 L 427 131 L 383 60 Z" fill={C.cyanHi} />
      </g>
      {/* seats */}
      <g>
        {/* padded backrests */}
        <rect x={16} y={171} width={175} height={24} fill="#3f251c" />
        <rect x={16} y={171} width={175} height={3} fill="#6d432d" />
        {Array.from({length: 5}, (_, i) => (
          <rect key={i} x={22 + i * 34} y={176} width={1} height={16} fill="#2e1a14" opacity={0.65} />
        ))}
        <rect x={16} y={190} width={175} height={5} fill="#24140f" />
        <rect x={289} y={171} width={175} height={24} fill="#3f251c" />
        <rect x={289} y={171} width={175} height={3} fill="#6d432d" />
        {Array.from({length: 5}, (_, i) => (
          <rect key={i} x={295 + i * 34} y={176} width={1} height={16} fill="#2e1a14" opacity={0.65} />
        ))}
        <rect x={289} y={190} width={175} height={5} fill="#24140f" />
        {/* left bench */}
        <rect x={14} y={194} width={178} height={8} fill="#b06a45" />
        <rect x={14} y={198} width={178} height={4} fill="#7e482f" />
        <rect x={14} y={202} width={178} height={25} fill="#5a3224" />
        <rect x={14} y={202} width={178} height={2} fill="#8f5338" />
        <rect x={14} y={222} width={178} height={5} fill="#3b2119" />
        {Array.from({length: 6}, (_, i) => (
          <rect key={i} x={21 + i * 29} y={207} width={17} height={1} fill="#3d2219" opacity={0.5} />
        ))}
        <rect x={18} y={188} width={3} height={9} fill="#39231b" />
        <rect x={183} y={188} width={3} height={9} fill="#39231b" />
        {/* right bench */}
        <rect x={288} y={194} width={178} height={8} fill="#b06a45" />
        <rect x={288} y={198} width={178} height={4} fill="#7e482f" />
        <rect x={288} y={202} width={178} height={25} fill="#5a3224" />
        <rect x={288} y={202} width={178} height={2} fill="#8f5338" />
        <rect x={288} y={222} width={178} height={5} fill="#3b2119" />
        {Array.from({length: 6}, (_, i) => (
          <rect key={i} x={295 + i * 29} y={207} width={17} height={1} fill="#3d2219" opacity={0.5} />
        ))}
        <rect x={292} y={188} width={3} height={9} fill="#39231b" />
        <rect x={457} y={188} width={3} height={9} fill="#39231b" />
      </g>
      {/* floor */}
      <rect x={0} y={227} width={480} height={43} fill="#20211c" />
      <rect x={0} y={227} width={480} height={2} fill="#5c5848" />
      <rect x={189} y={227} width={102} height={43} fill="#282820" opacity={0.45} />
      <rect x={0} y={260} width={480} height={10} fill="#151610" />
      <g opacity={0.24}>
        <rect x={208} y={234} width={64} height={1} fill={C.cyan} />
        <rect x={222} y={242} width={36} height={1} fill={C.orange} />
        <rect x={196} y={250} width={27} height={1} fill={C.cyan} />
        <rect x={253} y={252} width={31} height={1} fill={C.orange} />
      </g>
      {/* poles and handrails */}
      <g>
        <rect x={186} y={35} width={3} height={196} fill="#77735c" />
        <rect x={187} y={35} width={1} height={196} fill="#b0a988" opacity={0.5} />
        <rect x={291} y={35} width={3} height={196} fill="#77735c" />
        <rect x={292} y={35} width={1} height={196} fill="#b0a988" opacity={0.5} />
        <rect x={30} y={43} width={420} height={3} fill="#6f6a55" />
        <rect x={30} y={43} width={420} height={1} fill="#b0a988" opacity={0.5} />
        {[52, 104, 156, 226, 278, 345, 397, 449].map((x, i) => (
          <g key={i} transform={`translate(${x + (i % 2 ? strapSwing : -strapSwing)} 46)`}>
            <rect x={0} y={0} width={1} height={20 + (i % 3) * 3} fill="#262820" />
            <rect x={-2} y={18 + (i % 3) * 3} width={5} height={1} fill="#262820" />
            <rect x={-3} y={19 + (i % 3) * 3} width={7} height={4} fill="none" stroke="#8f8a6d" strokeWidth={1} />
            <rect x={-2} y={20 + (i % 3) * 3} width={5} height={2} fill="#d4d2b8" opacity={0.35} />
          </g>
        ))}
      </g>
      {/* passengers */}
      {boyOpacity > 0 ? (
        <g opacity={boyOpacity}>
          <Boy x={170} y={166} frame={frame} mode="sit" glow={false} opacity={1} />
        </g>
      ) : null}
      <Girl x={330} y={168} frame={frame} mode="sit" flip glow={false} opacity={1} headphones="neck" />
      {/* paper crane left behind */}
      {craneOnSeat ? (
        <g transform="translate(149 185)" opacity={0.85}>
          <PaperCrane x={0} y={0} frame={frame} scale={1.1} color={C.paper} glow={false} />
        </g>
      ) : null}
      {/* small items */}
      <g transform="translate(266 240)">
        <rect x={0} y={0} width={23} height={2} fill="#382c21" />
        <rect x={6} y={-2} width={11} height={2} fill={C.paper} opacity={0.28} />
      </g>
      <g transform="translate(428 205)">
        <rect x={0} y={0} width={3} height={17} fill="#35231c" />
        <rect x={1} y={-3} width={1} height={4} fill="#8f7858" />
      </g>
      {/* light pools and atmosphere */}
      <rect x={0} y={118} width={480} height={52} fill={C.orange} opacity={0.035 + warmth * 0.04} />
      <rect x={0} y={35} width={480} height={139} fill={C.night3} opacity={0.06} />
      <Dither x={0} y={160} w={480} h={15} color={C.orange} opacity={0.08} id="subway-dither" />
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.015 + warmth * 0.04} />
    </g>
  );
};

const CraneCloseup: React.FC<{frame: number}> = ({frame}) => {
  const reach = interpolate(frame, [20, 95], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fade = clamp01(interpolate(frame, [82, 108], [0, 1]));
  return (
    <SceneSvg>
      <rect width={480} height={270} fill="#120f0f" />
      <rect x={0} y={0} width={480} height={96} fill="#30302a" />
      <rect x={0} y={96} width={480} height={174} fill="#b06a45" />
      <rect x={0} y={96} width={480} height={8} fill="#7e482f" />
      <rect x={0} y={104} width={480} height={12} fill="#8f5338" />
      <rect x={0} y={180} width={480} height={90} fill="#5a3224" />
      <rect x={0} y={180} width={480} height={2} fill="#8f5338" />
      {Array.from({length: 9}, (_, i) => (
        <rect key={i} x={18 + i * 55} y={116} width={34} height={1} fill="#7e482f" opacity={0.5} />
      ))}
      <rect x={48} y={40} width={384} height={1} fill={C.orange} opacity={0.12} />
      <rect x={44} y={61} width={390} height={1} fill={C.orange} opacity={0.06} />
      <rect x={188} y={132} width={112} height={2} fill={C.night3} opacity={0.5} />
      <g transform="translate(220 80)">
        <PaperCrane x={0} y={0} frame={frame} scale={3.2} color={C.paper} glow={false} />
      </g>
      {/* cassette left on the seat */}
      <g transform="translate(302 151)">
        <rect x={0} y={0} width={58} height={36} fill="#17191a" />
        <rect x={3} y={3} width={52} height={30} fill="#262822" />
        <rect x={8} y={9} width={42} height={17} fill="#0c100e" />
        <circle cx={20} cy={17} r={5} fill="#090b0a" />
        <circle cx={20} cy={17} r={2} fill={C.cyanDim} />
        <circle cx={38} cy={17} r={5} fill="#090b0a" />
        <circle cx={38} cy={17} r={2} fill={C.cyanDim} />
        <rect x={8} y={28} width={26} height={2} fill={C.paper} opacity={0.68} />
        <rect x={44} y={28} width={5} height={2} fill={C.magenta} opacity={0.7} />
        <text x={29} y={6} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={3.5} fill={C.paper} opacity={0.5}>
          给同类
        </text>
      </g>
      {/* reaching hand */}
      <g transform={`translate(${Math.round((1 - reach) * 80)} 0)`}>
        <path d="M 480 270 L 480 198 L 452 195 L 429 205 L 410 220 L 370 228 L 353 239 L 362 251 L 383 250 L 402 243 L 419 254 L 431 270 Z" fill={C.skin} />
        <path d="M 480 206 L 455 202 L 434 211 L 412 227 L 376 234 L 360 241 L 366 245 L 388 241 L 407 238 L 420 248 L 438 270 L 480 270 Z" fill={C.skinHi} opacity={0.3} />
        <path d="M 420 224 L 444 220 L 462 230 L 473 249 L 480 270 L 446 270 L 431 255 Z" fill={C.skinShadow} opacity={0.25} />
        <path d="M 449 193 L 480 188 L 480 230 L 459 231 L 441 218 Z" fill={C.yellowDim} />
        <path d="M 455 197 L 480 193 L 480 224 L 460 226 L 448 216 Z" fill={C.yellow} />
        <rect x={393} y={239} width={28} height={2} fill={C.skinShadow} opacity={0.6} />
        <rect x={418} y={246} width={19} height={2} fill={C.skinShadow} opacity={0.5} />
      </g>
      {/* window light motif */}
      <g opacity={0.08}>
        <rect x={0} y={148} width={480} height={2} fill={C.cyan} />
        <rect x={0} y={154} width={480} height={1} fill={C.cyan} />
        <rect x={0} y={160} width={480} height={1} fill={C.cyan} />
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.cyanHi} opacity={fade * 0.48} />
      <rect x={0} y={0} width={480} height={270} fill={C.paper} opacity={fade * 0.7} />
    </SceneSvg>
  );
};

const CraneSeat: React.FC<{frame: number}> = ({frame}) => {
  const fade = clamp01((frame - 540) / 48);
  const p = clamp01((frame - 480) / 108);
  const scale = 1.6 + p * 0.12;
  return (
    <SceneSvg>
      <g transform={`translate(${2 - p * 6} ${-161 - p * 7}) scale(${scale})`}>
        <Interior frame={frame} boyOpacity={0} craneOnSeat warmth={0.3} />
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.025 + p * 0.025} />
      <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={fade} />
    </SceneSvg>
  );
};

export const SubwayScene: React.FC<{duration: number}> = ({duration}) => {
  const rawFrame = useCurrentFrame();
  // Stretch the original 588-frame arc across the longer song section,
  // keeping the paper-crane hand-off on the instrumental break.
  const frame = duration > 0 ? rawFrame * (588 / duration) : 0;
  const boyIn = clamp01(interpolate(frame, [112, 138], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const boyGone = frame >= 432;
  const craneOnSeat = frame >= 448;
  const closeup = frame >= 336 && frame < 408;
  const ending = frame >= 480;
  const station = frame > 400 && frame < 428 ? clamp01((frame - 400) / 28) : 0;
  const exitBlack = frame >= 428 && frame < 434 ? 1 : 0;
  if (ending) return <CraneSeat frame={frame} />;
  return (
    <>
      {closeup ? (
        <SceneSvg>
          <g transform="translate(-240 -210) scale(2)">
            <Interior frame={frame} boyOpacity={1} craneOnSeat={false} warmth={0.4} />
          </g>
          {/* foreground straps make the carriage feel close */}
          <g opacity={0.85}>
            {[{x: 214, ph: 0}, {x: 282, ph: 2}].map((s, i) => {
              const swing = Math.round(Math.sin(frame * 0.07 + s.ph) * 2);
              return (
                <g key={i} transform={`translate(${s.x} 0)`}>
                  <rect x={0} y={0} width={2} height={70 + i * 8} fill="#1a1713" />
                  <rect x={-1} y={8} width={4} height={2} fill="#5f5746" opacity={0.4} />
                  <g transform={`translate(${swing} ${70 + i * 8})`}>
                    <rect x={-5} y={0} width={12} height={2} fill="#17140f" />
                    <rect x={-7} y={2} width={16} height={3} fill="#2a251d" />
                    <rect x={-4} y={5} width={10} height={12} fill="#1c1712" />
                    <rect x={-3} y={5} width={8} height={1} fill="#8f8066" opacity={0.25} />
                    <rect x={-5} y={8} width={12} height={6} fill={C.black} />
                    <rect x={-3} y={10} width={8} height={4} fill="#3a342a" />
                  </g>
                </g>
              );
            })}
          </g>
          <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.03} />
          <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={0.12} />
          <rect x={0} y={0} width={480} height={270} fill={C.cyan} opacity={0.015} />
        </SceneSvg>
      ) : (
        <SceneSvg>
          <Interior
            frame={frame}
            boyOpacity={boyGone ? 0 : boyIn}
            craneOnSeat={craneOnSeat}
            warmth={frame > 330 ? 0.25 : 0}
          />
          <rect x={0} y={0} width={480} height={270} fill={C.paper} opacity={station * 0.09} />
          <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={exitBlack} />
          {frame < 14 ? (
            <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={1 - frame / 14} />
          ) : null}
          {frame > 408 && frame < 480 ? (
            <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={frame > 460 ? (frame - 460) / 20 : 0} />
          ) : null}
        </SceneSvg>
      )}
    </>
  );
};
