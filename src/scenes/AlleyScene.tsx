import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp01, stepClock} from '../theme';
import {Cat, Girl} from '../components/Characters';
import {Dither, PixelLabel, Rain, SceneSvg} from '../components/Primitives';
import {NeonSign} from '../components/Cityscape';

const Ledges: React.FC<{frame: number}> = ({frame}) => {
  const flicker = frame > 83 && frame < 86 ? 0.3 : 1;
  return (
    <g opacity={flicker}>
      {Array.from({length: 7}, (_, i) => (
        <g key={i}>
          <rect x={350 + i * 13} y={63 + i * 14} width={40} height={3} fill="#3e4964" />
          <rect x={350 + i * 13} y={66 + i * 14} width={3} height={9} fill="#29354d" />
          <rect x={386 + i * 13} y={66 + i * 14} width={3} height={9} fill="#29354d" />
          <rect x={350 + i * 13} y={63 + i * 14} width={40} height={1} fill="#6f819f" opacity={0.4} />
          <rect x={352 + i * 13} y={72 + i * 14} width={1} height={5} fill="#1b2538" />
          <rect x={374 + i * 13} y={72 + i * 14} width={1} height={5} fill="#1b2538" />
        </g>
      ))}
      {/* diagonal stringers and handrail turn the floating treads into stairs */}
      <path d="M 348 63 L 430 159" fill="none" stroke="#3a4760" strokeWidth={2} />
      <path d="M 350 60 L 432 156" fill="none" stroke="#52627e" strokeWidth={1} opacity={0.7} />
      <path d="M 348 48 Q 380 42 404 51" fill="none" stroke="#485772" strokeWidth={1} />
      <path d="M 354 48 L 354 62" stroke="#485772" strokeWidth={1} />
      <path d="M 375 46 L 375 60" stroke="#485772" strokeWidth={1} />
      <path d="M 397 48 L 397 62" stroke="#485772" strokeWidth={1} />
      {/* maintenance ladder dropping toward the alley */}
      <g opacity={0.9}>
        <rect x={334} y={154} width={2} height={71} fill="#2b3850" />
        <rect x={347} y={154} width={2} height={71} fill="#2b3850" />
        {Array.from({length: 9}, (_, i) => (
          <rect key={i} x={336} y={158 + i * 7} width={11} height={1} fill="#3f4e68" />
        ))}
        <rect x={332} y={150} width={19} height={4} fill="#3f4e68" />
      </g>
      <rect x={343} y={47} width={61} height={3} fill="#4b5873" />
      <rect x={346} y={50} width={2} height={13} fill="#2c3950" />
      <rect x={398} y={50} width={2} height={13} fill="#2c3950" />
      <rect x={345} y={44} width={55} height={2} fill={C.cyanDim} opacity={0.6} />
      {/* a silhouette is waiting at the top of the stairs */}
      <g transform="translate(355 25)" opacity={0.92}>
        <rect x={2} y={0} width={8} height={3} fill={C.black} />
        <rect x={0} y={3} width={11} height={10} fill={C.black} />
        <rect x={-2} y={5} width={3} height={8} fill={C.black} />
        <rect x={9} y={5} width={4} height={7} fill={C.black} />
        <rect x={-2} y={13} width={4} height={13} fill={C.black} />
        <rect x={6} y={13} width={4} height={13} fill={C.black} />
        <rect x={6} y={2} width={1} height={1} fill={C.orange} opacity={0.9} />
        <rect x={2} y={2} width={8} height={1} fill={C.orange} opacity={0.75} />
        <rect x={9} y={-1} width={2} height={1} fill={C.orangeHi} opacity={0.3} />
        <rect x={-1} y={24} width={5} height={2} fill={C.black} />
        <rect x={7} y={24} width={5} height={2} fill={C.black} />
      </g>
    </g>
  );
};

const Steam: React.FC<{frame: number; x: number; y: number}> = ({frame, x, y}) => (
  <g opacity={0.18}>
    {[0, 1, 2, 3, 4].map((i) => {
      const age = ((frame + i * 17) % 85) / 85;
      return (
        <g key={i} opacity={(1 - age) * 0.5}>
          <rect x={x + Math.round(Math.sin(age * 4 + i) * 6)} y={y - age * 54} width={5 + Math.round(age * 7)} height={2} fill={C.blueHi} />
          <rect x={x - 3 + Math.round(Math.sin(age * 3 + i * 2) * 8)} y={y - age * 60 + 3} width={3} height={1} fill={C.cyan} />
        </g>
      );
    })}
  </g>
);

export const AlleyScene: React.FC<{duration: number}> = ({duration}) => {
  const rawFrame = useCurrentFrame();
  const frame = duration > 0 ? rawFrame * (462 / duration) : 0;
  const girlX = 78 + frame * 0.34;
  const girlY = 203 + (Math.floor(frame / 12) % 2);
  const doorGlow = 0.55 + Math.sin(frame * 0.12) * 0.1;
  const fade = clamp01(interpolate(frame, [432, 460], [0, 1]));
  const lightning = (frame > 284 && frame < 288) || (frame > 338 && frame < 340);
  const tick = stepClock(frame, 5);
  return (
    <SceneSvg>
      <defs>
        <linearGradient id="alley-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060a16" />
          <stop offset="100%" stopColor="#101b33" />
        </linearGradient>
        <linearGradient id="door-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.orange} stopOpacity={0.8} />
          <stop offset="100%" stopColor={C.orangeHi} stopOpacity={0.05} />
        </linearGradient>
        <clipPath id="alley-clip">
          <rect x={0} y={0} width={480} height={270} />
        </clipPath>
      </defs>
      <g clipPath="url(#alley-clip)">
        <rect width={480} height={270} fill="#050810" />
        {/* sky slot */}
        <rect x={158} y={0} width={162} height={80} fill="url(#alley-sky)" />
        <g opacity={0.8}>
          <rect x={188} y={16} width={56} height={3} fill="#111a30" />
          <rect x={204} y={12} width={28} height={2} fill="#131d36" />
          <rect x={310} y={25} width={22} height={1} fill={C.cyan} opacity={0.2} />
          {[12, 40, 83, 122, 141].map((x, i) => (
            <rect key={i} x={x} y={7 + (i % 3) * 13} width={1} height={1} fill={C.paper} opacity={0.4} />
          ))}
        </g>
        <Rain frame={frame} count={42} top={0} bottom={140} speed={5} opacity={0.22} seed={27} color={C.blueHi} />
        {/* warm string lights across the alley */}
        <path d="M 0 60 Q 120 80 238 56 Q 360 36 480 66" fill="none" stroke="#202432" strokeWidth={1} />
        {[24, 70, 118, 166, 214, 262, 310, 358, 406, 454].map((x, i) => {
          const y = 62 + Math.round(Math.sin((x / 480) * Math.PI * 1.2) * 10);
          return (
            <g key={i} opacity={0.8}>
              <rect x={x} y={y} width={1} height={2} fill="#2b2a30" />
              <rect x={x - 1} y={y + 2} width={3} height={2} fill={i % 4 === 0 ? C.cyan : C.orangeHi} />
              <rect x={x - 2} y={y + 1} width={5} height={4} fill={i % 4 === 0 ? C.cyan : C.orange} opacity={0.12} />
            </g>
          );
        })}
        {/* back building */}
        <g>
          <rect x={157} y={43} width={164} height={186} fill="#10182b" />
          <rect x={165} y={51} width={150} height={170} fill="#0b1223" />
          {Array.from({length: 8}, (_, i) => (
            <rect key={i} x={157} y={53 + i * 21} width={164} height={1} fill="#1a2742" opacity={0.65} />
          ))}
          {Array.from({length: 4}, (_, i) => (
            <rect key={i} x={180 + i * 35} y={43} width={1} height={50} fill="#1b2740" opacity={0.5} />
          ))}
          {/* door */}
          <g>
            <rect x={208} y={117} width={70} height={113} fill={C.orange} opacity={doorGlow * 0.035} />
            <rect x={202} y={111} width={82} height={119} fill={C.orange} opacity={doorGlow * 0.018} />
            <rect x={216} y={125} width={54} height={103} fill="#0c0d16" />
            <rect x={219} y={128} width={48} height={100} fill="#2b2823" />
            <rect x={222} y={131} width={42} height={97} fill="#15120e" />
            <rect x={224} y={133} width={38} height={95} fill="#0b0906" />
            <rect x={224} y={211} width={38} height={17} fill={C.orange} opacity={doorGlow * 0.22} />
            <rect x={226} y={135} width={34} height={74} fill="url(#door-glow)" opacity={doorGlow * 0.72} />
            <rect x={230} y={140} width={26} height={2} fill={C.orangeHi} opacity={0.55} />
            <rect x={230} y={144} width={18} height={1} fill={C.orangeHi} opacity={0.22} />
            <rect x={242} y={198} width={3} height={3} fill={C.orangeHi} opacity={0.8} />
            <rect x={212} y={222} width={62} height={6} fill="#0a0d14" />
            <rect x={221} y={226} width={44} height={3} fill={C.orange} opacity={0.18} />
            <rect x={224} y={88} width={38} height={3} fill={C.orange} opacity={0.3} />
            <rect x={222} y={94} width={4} height={18} fill={C.stoneHi} opacity={0.6} />
            <rect x={262} y={94} width={4} height={18} fill={C.stoneHi} opacity={0.6} />
            <PixelLabel x={243} y={123} size={4} color={C.orangeHi} font="cn" anchor="middle" opacity={0.8}>
              舊電台
            </PixelLabel>
          </g>
          {/* windows on back building */}
          <g>
            <rect x={173} y={77} width={31} height={34} fill="#080d18" />
            <rect x={175} y={79} width={27} height={30} fill="#1b2a44" opacity={0.45} />
            <rect x={177} y={81} width={8} height={9} fill={C.orange} opacity={0.2} />
            <rect x={173} y={77} width={31} height={2} fill="#2c3852" />
            <rect x={278} y={70} width={27} height={26} fill="#070c17" />
            <rect x={280} y={72} width={23} height={22} fill={C.cyan} opacity={0.06} />
            <rect x={278} y={70} width={27} height={1} fill={C.cyan} opacity={0.2} />
          </g>
          <PixelLabel x={318} y={111} size={3.5} color={C.paper} font="cn" anchor="end" opacity={0.22}>
            巷尾
          </PixelLabel>
          <rect x={198} y={43} width={3} height={18} fill="#1c2941" />
          <rect x={203} y={43} width={1} height={10} fill="#1c2941" />
          {/* small safety lamp above the door */}
          <rect x={290} y={78} width={5} height={4} fill={C.orangeHi} opacity={0.75} />
          <rect x={289} y={77} width={7} height={1} fill={C.orange} opacity={0.4} />
          <rect x={292} y={82} width={1} height={4} fill={C.orange} opacity={0.12} />
          {/* taped posters and conduit */}
          <rect x={168} y={158} width={22} height={28} fill="#121b2a" />
          <rect x={170} y={160} width={18} height={24} fill={C.magenta} opacity={0.08} />
          <rect x={173} y={164} width={12} height={1} fill={C.paper} opacity={0.18} />
          <rect x={173} y={168} width={8} height={1} fill={C.paper} opacity={0.12} />
          <rect x={296} y={162} width={15} height={23} fill="#0c1422" />
          <rect x={298} y={164} width={11} height={19} fill={C.cyan} opacity={0.06} />
          <rect x={160} y={58} width={1} height={80} fill="#25324a" opacity={0.7} />
          <rect x={160} y={90} width={8} height={2} fill="#2c3b55" opacity={0.8} />
        </g>
        {/* left facade */}
        <g>
          <rect x={-20} y={0} width={190} height={238} fill="#0d1425" />
          <rect x={130} y={0} width={42} height={238} fill="#0a0f1c" />
          {Array.from({length: 12}, (_, i) => (
            <rect key={i} x={-10} y={16 + i * 18} width={150} height={1} fill="#182238" opacity={0.8} />
          ))}
          <rect x={19} y={69} width={72} height={65} fill="#080d18" />
          <rect x={22} y={72} width={66} height={59} fill="#2a1c17" />
          <rect x={24} y={74} width={62} height={54} fill="#3a281f" />
          <rect x={24} y={74} width={62} height={7} fill="#5a3a25" opacity={0.8} />
          <rect x={27} y={81} width={56} height={30} fill={C.orange} opacity={0.18} />
          <rect x={30} y={78} width={50} height={2} fill={C.orangeHi} opacity={0.26} />
          {/* diner interior */}
          <rect x={29} y={86} width={50} height={34} fill="#1b1715" opacity={0.8} />
          {[34, 48, 62].map((x, i) => (
            <g key={i}>
              <rect x={x} y={74 + (i % 2) * 4} width={1} height={8} fill={C.orangeHi} opacity={0.25} />
              <rect x={x - 2} y={82 + (i % 2) * 4} width={5} height={6} fill={C.orange} opacity={0.55} />
            </g>
          ))}
          <rect x={33} y={101} width={41} height={19} fill="#0d1016" opacity={0.88} />
          <rect x={36} y={95} width={5} height={9} fill="#0c0a0b" />
          <rect x={37} y={91} width={3} height={4} fill="#0c0a0b" />
          <rect x={53} y={93} width={5} height={11} fill="#0c0a0b" />
          <rect x={54} y={89} width={3} height={4} fill="#0c0a0b" />
          <rect x={63} y={99} width={8} height={5} fill={C.orange} opacity={0.2} />
          <rect x={24} y={105} width={62} height={2} fill="#724a2e" opacity={0.7} />
          <rect x={53} y={72} width={2} height={59} fill="#0d121e" />
          <rect x={19} y={69} width={72} height={2} fill="#5a4a44" />
          <rect x={19} y={69} width={2} height={65} fill="#29344c" />
          <rect x={89} y={69} width={2} height={65} fill="#29344c" />
          <rect x={88} y={78} width={4} height={36} fill="#202c43" />
          <rect x={85} y={91} width={9} height={3} fill="#2f3b52" />
          <rect x={24} y={114} width={62} height={2} fill="#0b0e15" />
          <rect x={5} y={26} width={4} height={52} fill="#283249" />
          <rect x={2} y={26} width={10} height={2} fill="#38445e" />
          {/* warm light spill from the diner */}
          <polygon points="22,134 96,134 130,224 10,224" fill={C.orange} opacity={0.045} />
          <rect x={27} y={150} width={42} height={2} fill={C.orange} opacity={0.12} />
          <rect x={34} y={166} width={24} height={1} fill={C.orange} opacity={0.08} />
          {/* shuttered shop */}
          <g transform="translate(104 143)">
            <rect x={0} y={0} width={44} height={72} fill="#171c27" />
            <rect x={2} y={2} width={40} height={68} fill="#242833" />
            {Array.from({length: 12}, (_, i) => (
              <rect key={i} x={3} y={5 + i * 5} width={38} height={2} fill="#171b23" />
            ))}
            <rect x={10} y={26} width={25} height={20} fill={C.magenta} opacity={0.08} />
            <circle cx={21} cy={36} r={7} fill="#181a20" />
            <circle cx={21} cy={36} r={2} fill="#3f4046" />
            <rect x={14} y={29} width={4} height={1} fill={C.paper} opacity={0.12} />
          </g>
          <g transform="translate(5 196)">
            <rect x={0} y={0} width={50} height={38} fill="#131826" />
            <rect x={4} y={4} width={42} height={2} fill="#27314a" />
            <rect x={4} y={10} width={35} height={1} fill="#27314a" />
            <rect x={4} y={16} width={42} height={1} fill="#27314a" />
            <rect x={7} y={21} width={11} height={12} fill="#1e2435" />
            <rect x={23} y={21} width={11} height={12} fill="#1e2435" />
            <rect x={39} y={21} width={9} height={12} fill="#1e2435" />
          </g>
          <NeonSign x={17} y={47} w={76} h={17} text="深夜食堂" color={C.orange} frame={frame} size={7} />
          <NeonSign x={136} y={14} w={16} h={58} text="回声" color={C.magenta} vertical frame={frame} size={5} />
          <rect x={0} y={223} width={140} height={7} fill="#171f31" />
          <rect x={0} y={229} width={140} height={3} fill="#263249" />
        </g>
        {/* right facade */}
        <g>
          <rect x={314} y={0} width={186} height={242} fill="#0b1120" />
          <rect x={314} y={0} width={38} height={242} fill="#0e1628" />
          {Array.from({length: 13}, (_, i) => (
            <rect key={i} x={316} y={12 + i * 18} width={158} height={1} fill="#1a2339" opacity={0.7} />
          ))}
          <rect x={389} y={22} width={66} height={51} fill="#070b13" />
          <rect x={392} y={25} width={60} height={45} fill="#13203a" />
          <rect x={396} y={29} width={22} height={24} fill={C.magenta} opacity={0.08} />
          <rect x={421} y={29} width={27} height={35} fill={C.cyan} opacity={0.05} />
          <rect x={389} y={22} width={66} height={2} fill="#2f3a50" />
          <rect x={389} y={72} width={66} height={2} fill="#2f3a50" />
          {/* pipes and AC */}
          <rect x={340} y={92} width={4} height={126} fill="#28334a" />
          <rect x={335} y={161} width={14} height={3} fill="#3b455a" />
          <rect x={455} y={10} width={5} height={202} fill="#232d42" />
          <rect x={450} y={57} width={15} height={4} fill="#38425a" />
          <g transform="translate(452 110)">
            <rect x={0} y={0} width={28} height={24} fill="#1a2232" />
            <rect x={3} y={3} width={18} height={18} fill="#0d1420" />
            <rect x={5} y={5} width={12} height={2} fill="#2e394e" />
            <rect x={5} y={9} width={12} height={2} fill="#2e394e" />
            <rect x={5} y={13} width={12} height={2} fill="#2e394e" />
          </g>
          {/* fire escape */}
          <Ledges frame={frame} />
          {/* vending machine */}
          <g>
            <rect x={411} y={149} width={53} height={69} fill="#0a0f19" />
            <rect x={414} y={152} width={47} height={63} fill="#10263b" />
            <rect x={416} y={154} width={43} height={33} fill={C.cyan} opacity={0.1} />
            <rect x={418} y={156} width={12} height={12} fill={C.magenta} opacity={0.45} />
            <rect x={432} y={156} width={12} height={12} fill={C.cyan} opacity={0.35} />
            <rect x={446} y={156} width={11} height={12} fill={C.orange} opacity={0.35} />
            <rect x={418} y={172} width={12} height={9} fill={C.cyan} opacity={0.25} />
            <rect x={432} y={172} width={12} height={9} fill={C.paper} opacity={0.14} />
            <rect x={446} y={172} width={11} height={9} fill={C.magenta} opacity={0.2} />
            <rect x={414} y={152} width={47} height={2} fill={C.cyan} opacity={0.35} />
            <PixelLabel x={437} y={205} size={4} color={C.cyan} anchor="middle" font="cn" shadow={false}>
              汽水
            </PixelLabel>
            <rect x={431} y={192} width={12} height={2} fill="#05080d" />
            <rect x={437} y={127} width={2} height={22} fill={C.cyan} opacity={0.18} />
          </g>
          <NeonSign x={322} y={86} w={16} h={42} text="夜" color={C.cyan} vertical frame={frame} size={8} />
          <NeonSign x={360} y={106} w={44} h={15} text="回家" color={C.magenta} frame={frame} size={7} />
        </g>
        {/* ground */}
        <g>
          <rect x={0} y={222} width={480} height={48} fill="#080c15" />
          <rect x={0} y={222} width={480} height={3} fill="#1d2739" />
          <rect x={140} y={230} width={210} height={40} fill="#0a101a" />
          {/* perspective tiles pull the eye toward the lit door */}
          <g opacity={0.6}>
            <polygon points="238,222 258,222 318,270 112,270" fill={C.cyan} opacity={0.035} />
            <polygon points="239,222 257,222 282,270 214,270" fill={C.cyanHi} opacity={0.03} />
            <path d="M 32 270 L 238 222" stroke="#18243a" strokeWidth={1} opacity={0.7} />
            <path d="M 158 270 L 242 222" stroke="#18243a" strokeWidth={1} opacity={0.6} />
            <path d="M 324 270 L 244 222" stroke="#18243a" strokeWidth={1} opacity={0.6} />
            <path d="M 452 270 L 248 222" stroke="#18243a" strokeWidth={1} opacity={0.7} />
            <path d="M 72 270 L 239 222" stroke="#111b2b" strokeWidth={1} opacity={0.5} />
            <path d="M 410 270 L 246 222" stroke="#111b2b" strokeWidth={1} opacity={0.5} />
            {[238, 248, 260].map((y, i) => (
              <rect key={i} x={140 - i * 18} y={y} width={200 + i * 36} height={1} fill="#1a2639" opacity={0.7} />
            ))}
          </g>
          {Array.from({length: 13}, (_, i) => (
            <rect key={i} x={(i * 41 + 17) % 470} y={230 + (i % 4) * 9} width={25} height={1} fill="#121b2a" opacity={0.8} />
          ))}
          <g opacity={0.4}>
            <rect x={216} y={226} width={54} height={44} fill={C.cyan} opacity={0.06} />
            <rect x={226} y={228} width={4} height={34} fill={C.cyan} opacity={0.14} />
            <rect x={248} y={228} width={2} height={38} fill={C.cyanHi} opacity={0.1} />
            <rect x={259} y={230} width={2} height={21} fill={C.cyan} opacity={0.08} />
          </g>
          {[166, 190, 356, 430].map((x, i) => (
            <g key={i} opacity={0.2}>
              <rect x={x} y={241 + (i % 2) * 8} width={3} height={16 + i * 3} fill={i % 2 ? C.magenta : C.orange} opacity={0.35} />
              <rect x={x + 6} y={248} width={1} height={8} fill={C.cyan} />
            </g>
          ))}
          <g opacity={0.6}>
            <rect x={120} y={247} width={92} height={1} fill={C.cyan} opacity={0.18} />
            <rect x={144} y={252} width={50} height={1} fill={C.cyan} opacity={0.12} />
            <rect x={282} y={243} width={70} height={1} fill={C.magenta} opacity={0.16} />
            <rect x={303} y={249} width={34} height={1} fill={C.orange} opacity={0.12} />
          </g>
          {/* light from the open door and vending machine pools on the wet asphalt */}
          <g opacity={0.85}>
            <rect x={218} y={230} width={50} height={2} fill={C.cyan} opacity={0.3} />
            <rect x={228} y={234} width={31} height={2} fill={C.cyanHi} opacity={0.22} />
            <rect x={232} y={239} width={22} height={2} fill={C.cyan} opacity={0.15} />
            <rect x={236} y={245} width={12} height={1} fill={C.cyanHi} opacity={0.1} />
            <rect x={408} y={234} width={58} height={2} fill={C.cyan} opacity={0.12} />
            <rect x={418} y={238} width={34} height={1} fill={C.magenta} opacity={0.12} />
            <rect x={70} y={244} width={60} height={2} fill={C.orange} opacity={0.12} />
            <rect x={84} y={249} width={28} height={1} fill={C.orangeHi} opacity={0.09} />
          </g>
          {/* rain rings in the puddles */}
          {[96, 152, 248, 310, 380].map((x, i) => {
            const p = (frame + i * 11) % 32;
            return (
              <g key={i} opacity={p < 18 ? 0.28 - p * 0.012 : 0}>
                <rect x={x - Math.floor(p / 2)} y={253 + i * 2} width={p} height={1} fill={C.cyan} />
                <rect x={x - Math.floor(p / 3)} y={255 + i * 2} width={Math.floor(p * 0.6)} height={1} fill={C.cyanHi} opacity={0.4} />
              </g>
            );
          })}
          {/* foreground debris frame */}
          <g opacity={0.9}>
            <rect x={-4} y={250} width={37} height={21} fill="#10151f" />
            <rect x={4} y={243} width={26} height={13} fill="#151c28" />
            <rect x={9} y={236} width={16} height={8} fill="#1b2331" />
            <rect x={17} y={231} width={11} height={6} fill="#232c3a" />
            <rect x={2} y={248} width={34} height={2} fill="#2b374b" />
            <rect x={12} y={241} width={2} height={2} fill={C.cyan} opacity={0.3} />
            <rect x={184} y={258} width={51} height={2} fill="#10151f" />
            <rect x={192} y={262} width={28} height={1} fill="#1a2233" />
            <rect x={344} y={255} width={50} height={2} fill="#111722" />
          </g>
          <rect x={0} y={267} width={480} height={3} fill="#04070c" />
        </g>
        {/* frames, wires, cables */}
        <g>
          <path d="M 0 35 Q 150 55 312 33" fill="none" stroke="#141d2d" strokeWidth={1} />
          <path d="M 0 43 Q 160 63 312 40" fill="none" stroke="#101826" strokeWidth={1} />
          <path d="M 312 40 Q 400 54 480 30" fill="none" stroke="#141d2d" strokeWidth={1} />
          {[68, 132, 201, 262, 340, 424].map((x, i) => (
            <rect key={i} x={x} y={35 + Math.round(Math.sin(i) * 3)} width={1} height={5} fill="#243049" opacity={0.8} />
          ))}
          <rect x={0} y={0} width={480} height={10} fill="#050811" opacity={0.6} />
        </g>
        {/* cat on a crate */}
        <g>
          <rect x={59} y={197} width={31} height={26} fill="#101724" />
          <rect x={62} y={200} width={25} height={2} fill="#1f2b41" />
          <rect x={62} y={210} width={25} height={1} fill="#1f2b41" />
          <Cat x={64} y={177} frame={frame} scale={0.8} color="#070a10" />
        </g>
        <Steam frame={frame} x={101} y={225} />
        <Steam frame={frame} x={322} y={220} />
        {/* color washes from the signs */}
        <polygon points="0,0 190,0 160,238 0,238" fill={C.magenta} opacity={0.018} />
        <polygon points="314,0 480,0 480,242 340,242" fill={C.cyan} opacity={0.022} />
        <polygon points="218,130 266,130 360,270 120,270" fill={C.cyan} opacity={0.025} />
        <rect x={0} y={206} width={480} height={22} fill={C.blueHi} opacity={0.025} />
        {/* volumetric light from the doorway */}
        <g opacity={0.5}>
          <polygon points="224,226 258,226 330,270 150,270" fill={C.cyan} opacity={0.06} />
          <polygon points="232,226 250,226 276,270 202,270" fill={C.cyanHi} opacity={0.06} />
          <rect x={214} y={223} width={58} height={8} fill={C.cyan} opacity={0.08} />
        </g>
        {/* girl */}
        <g opacity={0.12}>
          <g transform="translate(0 486) scale(1 -1)">
            <Girl x={girlX} y={girlY} frame={frame} mode="walk" />
          </g>
        </g>
        <Girl x={girlX} y={girlY} frame={frame} mode={frame > 360 ? 'look' : 'walk'} />
        <Rain frame={frame} count={120} top={0} bottom={270} speed={7} opacity={0.36} seed={39} splashY={258} splash />
        {lightning ? <rect x={0} y={0} width={480} height={270} fill="#cfe8ff" opacity={0.35} /> : null}
        {/* door glow grows to swallow the alley */}
        <rect x={0} y={0} width={480} height={270} fill={C.paper} opacity={fade * 0.72} />
      </g>
    </SceneSvg>
  );
};
