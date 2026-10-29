import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp01, stepClock} from '../theme';
import {Cat, PaperCrane} from '../components/Characters';
import {FishSprite, PixelLabel, Rain, SceneSvg} from '../components/Primitives';

const windowCity = [
  {x: 28, y: 104, w: 26, h: 58, c: '#101a31'},
  {x: 56, y: 88, w: 18, h: 74, c: '#0c152b'},
  {x: 76, y: 115, w: 32, h: 47, c: '#111c36'},
  {x: 110, y: 99, w: 20, h: 63, c: '#0e182f'},
  {x: 132, y: 120, w: 38, h: 42, c: '#10192f'},
];

const GirlBack: React.FC<{frame: number}> = ({frame}) => {
  const breathe = Math.round(Math.sin(frame * 0.04) * 0.9);
  const tick = stepClock(frame, 6);
  const hand = [0, 0, 1, 1, 0, -1][tick % 6];
  return (
    <g transform={`translate(0 ${breathe})`}>
      {/* chair */}
      <rect x={170} y={140} width={112} height={93} fill="#332027" />
      <rect x={175} y={145} width={102} height={72} fill="#2a1a20" />
      <rect x={178} y={151} width={3} height={60} fill="#4a2d30" />
      <rect x={194} y={151} width={3} height={60} fill="#4a2d30" />
      <rect x={210} y={151} width={3} height={60} fill="#4a2d30" />
      <rect x={252} y={151} width={3} height={60} fill="#4a2d30" />
      <rect x={268} y={151} width={3} height={60} fill="#4a2d30" />
      <rect x={162} y={213} width={126} height={8} fill="#3a2228" />
      <rect x={174} y={221} width={4} height={38} fill="#25161b" />
      <rect x={272} y={221} width={4} height={38} fill="#25161b" />
      {/* body */}
      <path d="M 166 209 L 172 170 L 185 151 L 208 143 L 254 143 L 273 158 L 280 210 Z" fill={C.yellowDim} />
      <path d="M 181 208 L 186 171 L 200 152 L 224 148 L 251 151 L 263 171 L 265 208 Z" fill={C.yellow} />
      <path d="M 194 158 L 219 148 L 247 152 L 252 166 L 231 173 L 211 167 Z" fill={C.yellowHi} opacity={0.33} />
      {/* coat structure: yoke, belt, seams, pockets */}
      <path d="M 185 155 L 203 146 L 224 150 L 248 147 L 262 157 L 255 171 L 230 178 L 204 170 L 188 164 Z" fill={C.yellowDim} opacity={0.65} />
      <path d="M 191 158 L 207 150 L 226 154 L 245 150 L 256 158 L 250 165 L 228 170 L 205 165 L 193 163 Z" fill={C.yellow} />
      <rect x={215} y={166} width={2} height={41} fill={C.yellowDim} opacity={0.8} />
      <rect x={186} y={184} width={76} height={2} fill={C.orange} opacity={0.32} />
      <rect x={190} y={193} width={18} height={10} fill={C.yellowDim} opacity={0.55} />
      <rect x={248} y={192} width={17} height={11} fill={C.yellowDim} opacity={0.45} />
      <rect x={192} y={195} width={14} height={1} fill={C.yellowHi} opacity={0.25} />
      <rect x={250} y={194} width={13} height={1} fill={C.yellowHi} opacity={0.2} />
      <rect x={173} y={181} width={2} height={27} fill={C.orange} opacity={0.3} />
      <rect x={269} y={179} width={2} height={29} fill={C.orange} opacity={0.3} />
      <rect x={202} y={174} width={1} height={12} fill={C.yellowHi} opacity={0.2} />
      <rect x={240} y={173} width={1} height={11} fill={C.yellowHi} opacity={0.18} />
      {/* left arm under desk */}
      <path d="M 173 162 L 183 167 L 184 193 L 174 199 Z" fill={C.yellowDim} />
      {/* right arm reaching to radio */}
      <g transform={`translate(${hand} 0)`}>
        <path d="M 259 158 L 279 158 L 294 162 L 301 166 L 298 174 L 285 174 L 273 169 L 260 171 Z" fill={C.yellowDim} />
        <rect x={278} y={159} width={18} height={2} fill={C.yellow} opacity={0.6} />
        <rect x={294} y={162} width={5} height={9} fill={C.orange} opacity={0.25} />
        <path d="M 292 162 L 306 161 L 311 166 L 308 172 L 297 172 L 291 169 Z" fill={C.skin} />
        <rect x={293} y={163} width={11} height={2} fill={C.skinHi} opacity={0.3} />
        <rect x={300} y={164} width={6} height={1} fill={C.skinShadow} />
        <rect x={303} y={168} width={4} height={1} fill={C.skinShadow} opacity={0.7} />
      </g>
      {/* neck / head */}
      <rect x={211} y={137} width={24} height={12} fill="#c78a76" />
      {/* knit scarf peeking above the coat */}
      <path d="M 195 142 L 213 137 L 234 139 L 249 145 L 243 154 L 224 151 L 203 152 Z" fill="#3a4a55" />
      <rect x={201} y={143} width={38} height={2} fill={C.cyanDim} opacity={0.55} />
      <rect x={214} y={148} width={2} height={2} fill={C.cyan} opacity={0.5} />
      {/* low bun and hair */}
      <rect x={208} y={90} width={17} height={12} fill={C.hair} />
      <rect x={211} y={88} width={11} height={3} fill={C.hairHi} opacity={0.5} />
      <rect x={224} y={93} width={3} height={2} fill={C.cyanDim} opacity={0.7} />
      <path d="M 197 124 L 200 109 L 215 99 L 238 98 L 253 108 L 258 127 L 253 143 L 235 150 L 211 146 L 200 138 Z" fill={C.hair} />
      <path d="M 203 110 L 218 103 L 238 103 L 249 111 L 246 123 L 228 130 L 209 123 Z" fill={C.hairHi} opacity={0.55} />
      <path d="M 208 106 L 218 101 L 231 101 L 242 106 L 233 110 L 220 110 Z" fill="#5b537a" opacity={0.35} />
      <rect x={222} y={128} width={7} height={3} fill={C.hairShadow} opacity={0.7} />
      <rect x={201} y={116} width={3} height={14} fill={C.hairHi} opacity={0.28} />
      <rect x={252} y={114} width={2} height={12} fill={C.hairHi} opacity={0.18} />
      <rect x={212} y={102} width={3} height={1} fill={C.cyanHi} opacity={0.2} />
      {/* headphones from the back */}
      <rect x={199} y={102} width={53} height={3} fill={C.cyanDim} />
      <rect x={200} y={103} width={51} height={1} fill={C.cyan} opacity={0.5} />
      <rect x={199} y={104} width={3} height={20} fill={C.cyanDim} />
      <rect x={248} y={104} width={4} height={20} fill={C.cyanDim} />
      <rect x={197} y={116} width={8} height={17} fill={C.cyan} />
      <rect x={247} y={116} width={8} height={17} fill={C.cyan} />
      <rect x={199} y={119} width={4} height={9} fill={C.cyanHi} opacity={0.45} />
      <rect x={249} y={119} width={3} height={9} fill={C.cyanHi} opacity={0.3} />
      <rect x={204} y={134} width={1} height={1} fill={Math.floor(frame / 16) % 2 ? C.cyanHi : C.cyanDim} />
      {/* cable */}
      <path d="M 255 133 L 266 145 L 274 167 L 286 179" fill="none" stroke="#121521" strokeWidth={1.5} />
      {/* yellow hood bunched at neck */}
      <path d="M 186 151 L 206 144 L 231 150 L 257 144 L 270 155 L 263 169 L 238 178 L 208 171 L 187 162 Z" fill={C.yellowDim} />
      <path d="M 192 155 L 210 148 L 233 154 L 255 148 L 261 157 L 238 165 L 207 160 Z" fill={C.yellow} />
      <path d="M 196 157 L 208 151 L 226 155 L 249 151 L 255 157 L 236 161 L 209 158 Z" fill={C.yellowHi} opacity={0.2} />
      {/* window-cool and lamp-warm rims on her shoulders */}
      <path d="M 168 171 L 184 153 L 201 145 L 199 154 L 185 172 L 172 191 Z" fill={C.cyan} opacity={0.16} />
      <rect x={257} y={153} width={3} height={22} fill={C.orange} opacity={0.22} />
      <rect x={265} y={171} width={2} height={26} fill={C.orange} opacity={0.16} />
      <rect x={188} y={146} width={1} height={8} fill={C.cyanHi} opacity={0.18} />
      <rect x={201} y={141} width={9} height={1} fill={C.cyan} opacity={0.12} />
    </g>
  );
};

const WideRoom: React.FC<{frame: number}> = ({frame}) => {
  const tick = stepClock(frame, 4);
  const lampFlicker = (frame > 66 && frame < 69) || (frame > 86 && frame < 88) ? 0.45 : 1;
  return (
    <SceneSvg>
      <defs>
        <clipPath id="windowClip">
          <rect x={18} y={34} width={165} height={122} />
        </clipPath>
      </defs>
      <rect width={480} height={270} fill="#0d1221" />
      <rect x={0} y={0} width={480} height={205} fill="#14182a" />
      <rect x={0} y={205} width={480} height={65} fill="#0b0e19" />
      {Array.from({length: 9}, (_, i) => (
        <rect key={i} x={i * 58} y={0} width={1} height={205} fill="#1c2238" opacity={0.4} />
      ))}
      {/* window */}
      <g>
        <rect x={15} y={31} width={171} height={128} fill="#090e1d" />
        <rect x={18} y={34} width={165} height={122} fill="#0b1428" />        <g>
          {windowCity.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} />
              {Array.from({length: Math.min(8, Math.floor(b.h / 9))}, (_, j) => (
                <rect
                  key={j}
                  x={b.x + 4 + (j % 3) * 7}
                  y={b.y + 5 + Math.floor(j / 3) * 10}
                  width={2}
                  height={2}
                  fill={j % 2 ? C.orange : C.cyan}
                  opacity={0.28 + (j % 3) * 0.15}
                />
              ))}
            </g>
          ))}
          <rect x={22} y={50} width={12} height={5} fill={C.magenta} opacity={0.32} />
          <rect x={132} y={60} width={20} height={3} fill={C.cyan} opacity={0.26} />
          <rect x={116} y={127} width={62} height={2} fill={C.orange} opacity={0.13} />
        </g>
        <g clipPath="url(#windowClip)">
          <Rain frame={frame} count={34} top={32} bottom={154} speed={3.4} opacity={0.3} seed={24} color={C.blueHi} />
          {[46, 82, 130, 158].map((x, i) => (
            <g key={i} opacity={0.3}>
              <rect x={x} y={50 + ((frame * 0.35 + i * 19) % 80)} width={1} height={11} fill={C.cyanHi} />
              <rect x={x + 2} y={68 + ((frame * 0.2 + i * 24) % 70)} width={1} height={5} fill={C.cyan} />
            </g>
          ))}
        </g>
        <rect x={15} y={31} width={171} height={3} fill="#3a2f37" />
        <rect x={15} y={31} width={3} height={128} fill="#3a2f37" />
        <rect x={183} y={31} width={3} height={128} fill="#3a2f37" />
        <rect x={15} y={156} width={171} height={3} fill="#4a3a3d" />
        <rect x={97} y={34} width={2} height={122} fill="#2b2530" />
        <rect x={18} y={94} width={165} height={1} fill="#2b2530" />
        <rect x={18} y={34} width={165} height={122} fill={C.cyan} opacity={0.035} />
        <g opacity={0.12}>
          <rect x={26} y={40} width={1} height={30} fill={C.cyanHi} />
          <rect x={31} y={46} width={1} height={17} fill={C.cyanHi} />
          <rect x={132} y={37} width={1} height={26} fill={C.cyanHi} />
          <rect x={166} y={52} width={1} height={31} fill={C.cyanHi} />
        </g>
        <rect x={18} y={34} width={165} height={2} fill={C.cyan} opacity={0.08} />
        {/* curtain */}
        <path d="M 184 29 L 199 31 L 195 161 L 181 161 Z" fill="#3a2731" />
        <rect x={187} y={42} width={2} height={94} fill="#513743" opacity={0.6} />
      </g>
      {/* shelves */}
      <g>
        <rect x={255} y={41} width={196} height={4} fill="#4d3230" />
        <rect x={255} y={72} width={196} height={4} fill="#4d3230" />
        <rect x={255} y={103} width={150} height={3} fill="#4d3230" opacity={0.8} />
        {Array.from({length: 17}, (_, i) => (
          <rect
            key={i}
            x={262 + i * 10}
            y={31 + (i % 4) * 2}
            width={6}
            height={10 - (i % 3)}
            fill={[C.cyanDim, C.magentaDim, C.orange, C.blue][i % 4]}
            opacity={0.75}
          />
        ))}
        {Array.from({length: 13}, (_, i) => (
          <rect
            key={i}
            x={261 + i * 13}
            y={59 + (i % 3) * 3}
            width={9}
            height={13 - (i % 4)}
            fill={[C.paper, C.cyanDim, C.brown, C.magentaDim][i % 4]}
            opacity={0.65}
          />
        ))}
        {/* cassette boombox / tapes */}
        <g transform="translate(375 78)">
          <rect x={0} y={0} width={55} height={25} fill="#10131d" />
          <rect x={2} y={2} width={51} height={21} fill="#1b2030" />
          <circle cx={12} cy={13} r={6} fill={C.black} />
          <circle cx={12} cy={13} r={4} fill={C.stone} />
          <circle cx={12} cy={13} r={1.5} fill={C.cyanDim} />
          <circle cx={35} cy={13} r={6} fill={C.black} />
          <circle cx={35} cy={13} r={4} fill={C.stone} />
          <circle cx={35} cy={13} r={1.5} fill={C.cyanDim} />
          <rect x={43} y={5} width={6} height={2} fill={C.orange} opacity={0.75} />
        </g>
        <g transform="translate(258 81)">
          <rect x={0} y={0} width={34} height={21} fill="#1a202c" />
          <rect x={2} y={2} width={30} height={15} fill="#0a0f19" />
          <circle cx={10} cy={9} r={3} fill={C.cyanDim} opacity={0.7} />
          <circle cx={23} cy={9} r={3} fill={C.cyanDim} opacity={0.7} />
        </g>
      </g>
      {/* hand-tacked record sleeve */}
      <g transform="translate(278 111)">
        <rect x={0} y={0} width={74} height={55} fill="#2b231d" />
        <rect x={1} y={1} width={72} height={53} fill="#cdbfa5" />
        <rect x={1} y={1} width={72} height={1} fill="#8b765c" opacity={0.6} />
        <circle cx={27} cy={20} r={12} fill="#4b3b30" />
        <circle cx={27} cy={20} r={3.5} fill="#cdbfa5" />
        <rect x={24} y={10} width={6} height={1} fill="#8b765c" opacity={0.6} />
        <text x={48} y={27} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={7} fill="#4b3b30">
          舊電台
        </text>
        <text x={37} y={45} textAnchor="middle" fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={4.5} fill="#725b49">
          夜裡 · 一個人的頻道
        </text>
      </g>
      {/* lamp */}
      <g>
        <rect x={407} y={126} width={3} height={74} fill="#4a3331" />
        <rect x={397} y={195} width={23} height={4} fill="#3a2928" />
        <path d="M 385 121 L 433 121 L 424 95 L 394 95 Z" fill="#e3a353" />
        <path d="M 393 96 L 424 96 L 419 119 L 397 119 Z" fill={C.orangeHi} opacity={0.55 * lampFlicker} />
        <rect x={401} y={122} width={17} height={3} fill={C.orange} opacity={0.9 * lampFlicker} />
        {[1, 2, 3].map((i) => (
          <polygon
            key={i}
            points={`${392 - i * 9},${124} ${426 + i * 9},${124} ${453 + i * 24},208 ${350 - i * 24},208`}
            fill={C.orange}
            opacity={0.026 * lampFlicker}
          />
        ))}
        <rect x={343} y={148} width={64} height={51} fill={C.orange} opacity={0.035 * lampFlicker} />
      </g>
      {/* desk */}
      <g>
        <rect x={82} y={174} width={386} height={8} fill="#543832" />
        <rect x={82} y={174} width={386} height={2} fill="#7f5444" />
        <rect x={93} y={182} width={374} height={9} fill="#33221f" />
        <rect x={93} y={191} width={374} height={33} fill="#2a1b1a" />
        <rect x={104} y={198} width={118} height={33} fill="#211615" opacity={0.6} />
        <rect x={104} y={198} width={118} height={1} fill="#442d29" />
        <circle cx={163} cy={215} r={1.5} fill={C.orange} opacity={0.75} />
        <rect x={240} y={198} width={214} height={33} fill="#241715" opacity={0.35} />
        <rect x={97} y={224} width={5} height={46} fill="#1f1412" />
        <rect x={453} y={224} width={5} height={46} fill="#1f1412" />
      </g>
      {/* radio on desk */}
      <g transform="translate(286 145)">
        <rect x={0} y={0} width={82} height={30} fill="#090d14" />
        <rect x={2} y={2} width={78} height={26} fill="#171d25" />
        <rect x={5} y={5} width={29} height={18} fill="#05080d" />
        {Array.from({length: 5}, (_, i) => (
          <rect key={i} x={7} y={7 + i * 3} width={25} height={1} fill={C.stoneHi} opacity={0.5} />
        ))}
        <rect x={38} y={5} width={38} height={10} fill="#0a2418" />
        <rect x={40} y={7} width={34} height={6} fill="#0f3b24" />
        <path
          d={`M 41 ${10 + Math.round(Math.sin(frame * 0.23) * 1)} L 48 ${10 + Math.round(Math.sin(frame * 0.23 + 1) * 2)} L 55 ${10 + Math.round(Math.sin(frame * 0.23 + 2) * 1)} L 62 ${10 + Math.round(Math.sin(frame * 0.23 + 3) * 2)} L 70 ${10 + Math.round(Math.sin(frame * 0.23 + 4) * 1)}`}
          fill="none"
          stroke={C.green}
          strokeWidth={1}
          opacity={0.8}
        />
        <circle cx={50} cy={21} r={5} fill="#0b0e13" />
        <circle cx={50} cy={21} r={3.5} fill="#2c2b30" />
        <rect x={49} y={17} width={1} height={4} fill={C.cyan} transform={`rotate(${tick * 18} 50 21)`} />
        <circle cx={67} cy={21} r={4} fill="#0b0e13" />
        <circle cx={67} cy={21} r={2.5} fill="#2c2b30" />
        <rect x={66} y={18} width={1} height={3} fill={C.orange} transform={`rotate(${30 + tick * 9} 67 21)`} />
        <rect x={0} y={28} width={82} height={2} fill="#2b201e" />
        <PixelLabel x={44} y={12} size={3.5} color={C.orangeHi} anchor="middle" font="cn" shadow={false}>
          調頻
        </PixelLabel>
      </g>
      {/* desk objects */}
      <g>
        <rect x={337} y={157} width={13} height={17} fill={C.paper} />
        <rect x={339} y={159} width={9} height={3} fill={C.cyanDim} opacity={0.6} />
        <rect x={339} y={157} width={9} height={1} fill={C.orange} opacity={0.5} />
        <rect x={337} y={155} width={3} height={4} fill={C.paper} />
        <rect x={363} y={162} width={15} height={12} fill="#c9bda9" />
        <rect x={365} y={164} width={11} height={2} fill={C.brown} opacity={0.5} />
        <rect x={369} y={160} width={1} height={3} fill="#c9bda9" />
        {/* photo frame */}
        <g transform="translate(252 155)">
          <rect x={0} y={0} width={28} height={19} fill="#3a2928" />
          <rect x={2} y={2} width={24} height={15} fill="#0d1830" />
          <rect x={5} y={5} width={8} height={9} fill={C.yellowDim} />
          <rect x={16} y={6} width={7} height={8} fill={C.cyanDim} />
          <rect x={3} y={14} width={22} height={1} fill={C.orange} opacity={0.3} />
        </g>
        <g transform="translate(377 158)">
          <rect x={0} y={-5} width={14} height={6} fill="#14181f" />
          <rect x={2} y={-9} width={10} height={5} fill="#1c2330" />
          <rect x={3} y={-8} width={3} height={2} fill={C.magenta} opacity={0.5} />
          <rect x={7} y={-8} width={3} height={2} fill={C.cyan} opacity={0.5} />
        </g>
        <Cat x={151} y={141} frame={frame} scale={0.8} color="#070a12" />
        <rect x={148} y={146} width={2} height={1} fill={C.cyan} opacity={0.45} />
        <rect x={157} y={145} width={2} height={1} fill={C.magenta} opacity={0.35} />
        <g transform="translate(423 154)">
          <rect x={0} y={0} width={23} height={3} fill={C.paper} opacity={0.6} />
          <rect x={0} y={4} width={18} height={2} fill={C.paper} opacity={0.5} />
          <rect x={0} y={8} width={22} height={1} fill={C.paper} opacity={0.35} />
        </g>
        {/* the paper crane from the bus seat */}
        <PaperCrane x={378} y={155} frame={frame} scale={1.15} color={C.paper} glow={false} />
      </g>
      <GirlBack frame={frame} />
      {/* lamp warmth and shadow */}
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.03 * lampFlicker} />
      <rect x={0} y={0} width={480} height={270} fill={C.blue} opacity={0.07} style={{mixBlendMode: 'multiply'}} />
      <rect x={0} y={0} width={480} height={270} fill={C.orange} opacity={0.02 * lampFlicker} />
      <g opacity={0.8}>
        <PixelLabel x={20} y={167} size={4} color={C.cyan} opacity={0.5} font="cn">
          深夜 · 02:17
        </PixelLabel>
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={frame < 4 ? 1 - frame / 4 : 0} />
    </SceneSvg>
  );
};

const scopePath = (frame: number) => {
  if (frame < 24) {
    let d = 'M 186 135';
    for (let i = 0; i < 130; i += 4) {
      const n = Math.sin(i * 2.4 + frame * 2.1) * 8 * Math.sin(i * 0.12);
      d += ` L ${186 + i} ${135 + Math.round(n)}`;
    }
    return d;
  }
  if (frame < 44) {
    let d = 'M 186 135';
    for (let i = 0; i < 130; i += 2) {
      const y = 135 + Math.sin(i * 0.09 + frame * 0.18) * (9 + Math.sin(frame * 0.12) * 5);
      d += ` L ${186 + i} ${Math.round(y)}`;
    }
    return d;
  }
  // the carrier settles; the fish is drawn as a clean signal glyph above this line
  let d = 'M 186 140';
  for (let i = 0; i < 286; i += 3) {
    const y = 140 + Math.round(Math.sin(i * 0.07 + frame * 0.12) * (2 + Math.sin(frame * 0.1) * 1.5));
    d += ` L ${186 + i} ${y}`;
  }
  return d;
};

const RadioCloseup: React.FC<{frame: number}> = ({frame}) => {
  const dial = interpolate(frame, [0, 28], [87.2, 88.7], {extrapolateRight: 'clamp'});
  const signal = clamp01(interpolate(frame, [18, 42], [0, 1]));
  const fishOut = clamp01(interpolate(frame, [46, 104], [0, 1]));
  const tick = stepClock(frame, 6);
  const scan = 74 + ((frame * 2) % 150);
  const locked = frame >= 42;
  const freq = frame < 28 ? dial.toFixed(1) : '88.7';
  return (
    <SceneSvg>
      <defs>
        <clipPath id="scopeClip">
          <rect x={180} y={100} width={300} height={78} />
        </clipPath>
        <linearGradient id="radioGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.green} stopOpacity={0.15} />
          <stop offset="100%" stopColor={C.green} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect width={480} height={270} fill="#090b10" />
      <rect x={0} y={0} width={480} height={270} fill="#1b1514" />
      <rect x={22} y={18} width={436} height={238} fill="#2b1d1b" />
      <rect x={30} y={24} width={420} height={224} fill="#0b0d10" />
      <rect x={34} y={28} width={412} height={216} fill="#14171b" />
      {Array.from({length: 10}, (_, i) => (
        <rect key={i} x={36 + i * 42} y={28} width={1} height={216} fill="#21262b" opacity={0.5} />
      ))}
      {/* speaker grille */}
      <g>
        <rect x={50} y={50} width={112} height={172} fill="#090b0e" />
        <rect x={52} y={52} width={108} height={168} fill="#171a1f" />
        {Array.from({length: 24}, (_, i) => (
          <rect key={i} x={58} y={58 + i * 6.6} width={96} height={2} fill="#07090c" opacity={0.8} />
        ))}
        <rect x={50} y={50} width={112} height={2} fill={C.cyanDim} opacity={0.3} />
        <PixelLabel x={106} y={232} size={4} color={C.stoneHi} anchor="middle" font="cn" shadow={false}>
          同類 · 舊收音機
        </PixelLabel>
      </g>
      {/* analog tuning glass */}
      <g>
        <rect x={180} y={42} width={286} height={42} fill="#0d0906" />
        <rect x={184} y={46} width={278} height={34} fill="#241a10" />
        <rect x={184} y={46} width={278} height={1} fill={C.orange} opacity={0.35} />
        {Array.from({length: 29}, (_, i) => (
          <rect key={i} x={188 + i * 9.5} y={48} width={1} height={i % 5 === 0 ? 6 : 3} fill={C.orangeHi} opacity={i % 5 === 0 ? 0.6 : 0.3} />
        ))}
        <text x={206} y={69} fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={13} fill={C.orangeHi}>
          深夜電台
        </text>
        <text x={310} y={67} fontFamily="'Fusion Pixel 12px Proportional SC', monospace" fontSize={6} fill={C.paper} opacity={0.55}>
          一個人的頻道
        </text>
        <rect x={Math.round(208 + signal * 220)} y={76} width={2} height={6} fill={C.orange} opacity={0.85} />
        <rect x={Math.round(208 + signal * 220) - 2} y={74} width={6} height={2} fill={C.orange} opacity={0.55} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={396 + i * 10} y={60 - i * 3} width={5} height={4 + i * 3} fill={signal > (i + 1) / 5 ? C.orange : C.orangeHi} opacity={signal > (i + 1) / 5 ? 0.75 : 0.18} />
        ))}
      </g>
      {/* warm glowing dial */}
      <g>
        <rect x={180} y={100} width={300} height={78} fill="#140f0a" />
        <rect x={184} y={104} width={292} height={70} fill="#241b11" />
        <g clipPath="url(#scopeClip)">
          {Array.from({length: 12}, (_, i) => (
            <rect key={`v${i}`} x={186 + i * 25} y={104} width={1} height={70} fill={C.orange} opacity={0.09} />
          ))}
          {Array.from({length: 6}, (_, i) => (
            <rect key={`h${i}`} x={184} y={106 + i * 12} width={292} height={1} fill={C.orange} opacity={0.09} />
          ))}
          {frame >= 44 ? (
            <g opacity={clamp01((frame - 44) / 14)}>
              <path d={scopePath(frame)} fill={C.orange} opacity={0.1} />
            </g>
          ) : null}
          <path d={scopePath(frame)} fill="none" stroke={C.orangeHi} strokeWidth={2} opacity={0.9} />
          {frame >= 42 ? (
            <g opacity={clamp01((frame - 42) / 12)}>
              <FishSprite x={254} y={119} scale={6} color={C.orangeHi} eye="#241b11" glow={false} />
              <rect x={366} y={136} width={9} height={2} fill={C.orangeHi} opacity={0.35} />
              <rect x={380} y={132} width={5} height={2} fill={C.orange} opacity={0.22} />
              <rect x={205} y={164} width={48} height={2} fill={C.orange} opacity={0.22} />
            </g>
          ) : null}
          <rect x={184 + ((frame * 2.4) % 286)} y={104} width={1} height={70} fill={C.orangeHi} opacity={0.12} />
        </g>
        <rect x={180} y={178} width={300} height={2} fill="#3a3025" />
      </g>
      {/* knobs and cassette deck */}
      <g>
        <circle cx={214} cy={215} r={23} fill="#07090b" />
        <circle cx={214} cy={215} r={18} fill="#292b2b" />
        <circle cx={214} cy={215} r={12} fill="#111315" />
        <rect
          x={213}
          y={197}
          width={2}
          height={18}
          fill={C.orange}
          transform={`rotate(${20 + tick * 11} 214 215)`}
        />
        <circle cx={272} cy={215} r={14} fill="#07090b" />
        <circle cx={272} cy={215} r={10} fill="#292b2b" />
        <rect x={271} y={205} width={2} height={10} fill={C.cyan} transform={`rotate(${70 + tick * 4} 272 215)`} />
        <rect x={302} y={192} width={112} height={46} fill="#090b0d" />
        <rect x={306} y={196} width={104} height={12} fill="#171a1c" />
        <rect x={320} y={200} width={76} height={3} fill="#050607" />
        <rect x={322} y={199} width={9} height={5} fill={C.stone} />
        <rect x={340} y={199} width={9} height={5} fill={C.stone} />
        <rect x={360} y={199} width={9} height={5} fill={C.stone} />
        <rect x={380} y={199} width={9} height={5} fill={C.stone} />
        <PixelLabel x={358} y={222} size={4} color={C.paper} anchor="middle" font="cn" opacity={0.6} shadow={false}>
          卡帶 · 深夜
        </PixelLabel>
        <rect x={424} y={206} width={4} height={4} fill={frame % 24 < 5 ? C.red : C.red} opacity={frame % 24 < 5 ? 1 : 0.3} />
      </g>
      {/* hand on the dial */}
      <g transform={`translate(${tick % 3} 0)`}>
        <path d="M 392 270 L 402 241 L 418 221 L 438 217 L 456 226 L 462 246 L 450 270 Z" fill={C.skin} />
        <path d="M 401 270 L 410 246 L 424 231 L 436 228 L 443 233 L 432 242 L 420 253 L 414 270 Z" fill={C.skinHi} opacity={0.45} />
        <path d="M 444 216 L 470 207 L 480 224 L 480 270 L 455 270 Z" fill={C.yellowDim} />
        <path d="M 448 220 L 467 213 L 474 223 L 470 242 L 453 245 Z" fill={C.yellow} />
        <rect x={430} y={229} width={13} height={2} fill={C.skinShadow} />
        <rect x={437} y={237} width={8} height={2} fill={C.skinShadow} opacity={0.7} />
        <rect x={405} y={233} width={24} height={2} fill={C.skinHi} opacity={0.3} />
        <rect x={414} y={242} width={19} height={2} fill={C.skinHi} opacity={0.22} />
        <rect x={406} y={252} width={23} height={2} fill={C.skinShadow} opacity={0.25} />
        <rect x={423} y={226} width={14} height={1} fill={C.orangeHi} opacity={0.35} />
      </g>
      {/* the little signal leaves the screen */}
      <g opacity={fishOut}>
        {[0, 1, 2, 3].map((i) => {
          const progress = clamp01((frame - 46 - i * 10) / 58);
          return (
            <FishSprite
              key={i}
              x={230 + i * 34 + progress * 70}
              y={130 - progress * 58 - i * 6}
              scale={0.8 + i * 0.12}
              color={C.green}
              eye={C.night0}
              opacity={0.16 + (1 - progress) * 0.55}
            />
          );
        })}
      </g>
      {/* dust / scanline */}
      <g opacity={0.12}>
        <rect x={0} y={scan} width={480} height={1} fill={C.cyanHi} />
        <rect x={0} y={scan + 2} width={480} height={1} fill={C.green} />
      </g>
      <rect x={0} y={0} width={480} height={270} fill={C.green} opacity={0.018 + signal * 0.015} />
      <rect x={0} y={0} width={480} height={270} fill={C.black} opacity={clamp01(1 - frame / 6)} />
      <rect x={0} y={0} width={480} height={270} fill={C.cyanHi} opacity={clamp01((frame - 106) / 20) * 0.65} />
    </SceneSvg>
  );
};

export const RoomScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const push = 1 + 0.035 * clamp01(frame / Math.max(1, duration));
  return (
    <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 58%'}}>
      <WideRoom frame={frame} />
    </AbsoluteFill>
  );
};
