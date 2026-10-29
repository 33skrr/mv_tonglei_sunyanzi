import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, mixColor} from '../theme';
import {Dither, PixelLabel, SceneSvg} from '../components/Primitives';

const bokeh = [
  {x: 12, y: 42, w: 34, h: 8, c: C.cyan, o: 0.18},
  {x: 58, y: 28, w: 10, h: 52, c: C.magenta, o: 0.14},
  {x: 108, y: 70, w: 58, h: 6, c: C.orange, o: 0.14},
  {x: 0, y: 92, w: 74, h: 3, c: C.blueHi, o: 0.16},
  {x: 138, y: 24, w: 28, h: 12, c: C.cyan, o: 0.1},
  {x: 24, y: 164, w: 52, h: 5, c: C.magenta, o: 0.12},
  {x: 90, y: 206, w: 74, h: 2, c: C.cyan, o: 0.08},
];

const glassDrops = [
  {x: 58, y: 38, w: 2, h: 14, s: 0.26},
  {x: 118, y: 152, w: 3, h: 22, s: 0.22},
  {x: 204, y: 12, w: 2, h: 8, s: 0.18},
  {x: 398, y: 70, w: 2, h: 18, s: 0.2},
  {x: 448, y: 178, w: 3, h: 30, s: 0.16},
  {x: 352, y: 6, w: 2, h: 12, s: 0.18},
];

export const PortraitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const breathe = Math.round(Math.sin(frame * 0.045) * 1);
  const blink = [52, 128, 210].some((b) => frame >= b && frame < b + 3);
  const neonFlicker = (frame > 72 && frame < 79) || (frame > 168 && frame < 172);
  const rim = neonFlicker ? 0.5 : 0.2;
  const tear = frame > 184;
  const rimColor = neonFlicker ? C.magenta : C.blueHi;
  return (
    <SceneSvg>
      <defs>
        <linearGradient id="portrait-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080d1e" />
          <stop offset="58%" stopColor="#121b35" />
          <stop offset="100%" stopColor="#0a0e1d" />
        </linearGradient>
        <linearGradient id="face-shade" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#b87463" />
          <stop offset="55%" stopColor="#f2b695" />
          <stop offset="100%" stopColor="#ffcfae" />
        </linearGradient>
      </defs>
      <rect width={480} height={270} fill="url(#portrait-bg)" />
      {/* soft, blocky bokeh — the city seen from behind wet glass */}
      <g>
        {bokeh.map((b, i) => (
          <g key={i} opacity={b.o * (neonFlicker && i % 2 === 0 ? 0.4 : 1)}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} />
            <rect x={b.x + 4} y={b.y - 3} width={b.w - 8} height={2} fill={C.white} opacity={0.4} />
          </g>
        ))}
        <g transform="translate(8 70)">
          <rect x={0} y={0} width={54} height={14} fill={C.black} opacity={0.55} />
          <rect x={1} y={1} width={52} height={12} fill={C.cyan} opacity={0.14} />
          <PixelLabel x={27} y={11} size={8} color={C.orangeHi} anchor="middle" opacity={0.75} font="cn">
            夜
          </PixelLabel>
        </g>
        <Dither x={0} y={220} w={220} h={50} color="#1c2949" opacity={0.2} id="portrait-dither" />
      </g>
      {/* shoulders / yellow raincoat */}
      <g transform={`translate(0 ${breathe})`}>
        <path
          d="M 48 270 L 62 236 L 104 221 L 158 229 L 206 210 L 268 208 L 316 224 L 350 246 L 366 270 Z"
          fill={C.yellowDim}
        />
        <path d="M 64 270 L 83 241 L 132 230 L 178 234 L 222 218 L 270 223 L 315 240 L 329 270 Z" fill={C.yellow} />
        <rect x={112} y={236} width={86} height={4} fill={C.yellowHi} opacity={0.45} />
        <rect x={230} y={227} width={48} height={3} fill={C.yellowDim} />
        <rect x={287} y={243} width={4} height={27} fill={C.yellowDim} />
        <rect x={290} y={250} width={2} height={2} fill={C.orangeHi} opacity={0.7} />
        <rect x={266} y={256} width={2} height={2} fill={C.orangeHi} opacity={0.5} />
        {/* collar */}
        <path d="M 262 219 L 292 210 L 328 221 L 339 246 L 313 258 L 280 252 L 254 238 Z" fill={C.yellowDim} />
        <path d="M 270 220 L 295 215 L 322 225 L 326 239 L 307 247 L 284 243 L 266 232 Z" fill={C.yellow} />
        <rect x={299} y={226} width={2} height={12} fill={C.orange} opacity={0.5} />
        {/* scarf */}
        <path d="M 268 208 L 301 205 L 326 214 L 328 224 L 311 230 L 287 225 L 267 220 Z" fill="#163d48" />
        <path d="M 272 210 L 300 208 L 322 216 L 319 221 L 294 218 L 275 220 Z" fill={C.teal} />
        <rect x={288} y={213} width={27} height={1} fill={C.cyan} opacity={0.45} />
        <rect x={312} y={220} width={10} height={2} fill={C.cyanDim} opacity={0.7} />
        <rect x={320} y={222} width={4} height={12} fill="#163d48" />
        <rect x={268} y={220} width={2} height={2} fill={C.cyanHi} opacity={0.35} />
        {/* coat folds */}
        <rect x={118} y={245} width={28} height={2} fill={C.yellowDim} opacity={0.7} />
        <rect x={158} y={238} width={2} height={26} fill={C.yellowDim} opacity={0.65} />
        <rect x={205} y={246} width={22} height={2} fill={C.yellowHi} opacity={0.17} />
        <rect x={243} y={238} width={2} height={25} fill={C.yellowDim} opacity={0.45} />
        <rect x={333} y={250} width={3} height={20} fill={C.yellowDim} opacity={0.6} />
        {/* fish pin on the coat */}
        <g transform="translate(160 248)">
          <rect x={0} y={2} width={3} height={2} fill={C.cyanDim} />
          <rect x={3} y={0} width={7} height={6} fill={C.cyan} />
          <rect x={6} y={2} width={2} height={2} fill={C.night0} />
          <rect x={2} y={3} width={3} height={1} fill={C.cyanDim} />
        </g>
      </g>
      {/* neck */}
      <path d="M 286 176 L 321 176 L 323 212 L 303 223 L 286 211 Z" fill="#c78a76" />
      <path d="M 293 180 L 318 180 L 318 210 L 302 217 L 289 208 Z" fill="#dda18a" />
      <rect x={290} y={193} width={20} height={2} fill="#b87463" opacity={0.7} />
      <rect x={295} y={202} width={4} height={1} fill="#eab398" opacity={0.45} />
      <rect x={288} y={176} width={31} height={3} fill="#b87463" opacity={0.55} />
      {/* hair behind */}
      <g transform={`translate(0 ${breathe})`}>
        <path
          d="M 150 66 L 170 29 L 221 10 L 285 16 L 324 39 L 334 79 L 322 112 L 307 133 L 300 168 L 276 196 L 251 218 L 209 237 L 167 232 L 148 208 L 163 180 L 140 156 L 137 112 L 148 84 Z"
          fill={C.hair}
        />
        <path d="M 167 55 L 195 27 L 248 20 L 302 35 L 318 60 L 288 53 L 258 48 L 221 58 L 190 82 L 170 95 Z" fill={C.hairHi} opacity={0.7} />
        <rect x={151} y={100} width={10} height={77} fill={C.hairShadow} />
        <rect x={162} y={130} width={9} height={82} fill={C.hairHi} opacity={0.3} />
        <rect x={172} y={188} width={24} height={38} fill={C.hairShadow} />
        <path d="M 203 223 L 253 221 L 259 244 L 229 260 L 197 247 Z" fill={C.hair} />
        <path d="M 223 223 L 258 228 L 252 244 L 227 248 Z" fill={C.hairHi} opacity={0.4} />
      </g>
      {/* face */}
      <g transform={`translate(0 ${breathe})`}>
        <path
          d="M 300 52 L 344 52 L 344 60 L 350 60 L 350 76 L 346 76 L 346 86 L 353 86 L 353 99 L 358 99 L 358 118 L 364 118 L 364 127 L 358 132 L 351 132 L 351 142 L 356 142 L 356 149 L 350 153 L 350 162 L 344 162 L 344 172 L 337 172 L 337 182 L 329 182 L 329 190 L 320 190 L 320 197 L 304 197 L 298 190 L 288 178 Z"
          fill="url(#face-shade)"
        />
        <path d="M 300 52 L 344 52 L 350 60 L 350 76 L 341 78 L 330 84 L 316 85 L 307 98 L 303 86 L 298 90 Z" fill="#e4a488" opacity={0.55} />
        <path d="M 304 160 L 329 160 L 329 182 L 320 190 L 304 190 Z" fill="#d79a81" opacity={0.7} />
        <rect x={330} y={62} width={7} height={2} fill={C.skinHi} opacity={0.55} />
        <rect x={337} y={108} width={4} height={3} fill={C.skinHi} opacity={0.5} />
        <rect x={352} y={124} width={3} height={2} fill={C.skinShadow} />
        {/* cheek shading */}
        <path d="M 310 130 L 335 130 L 333 156 L 313 166 L 305 148 Z" fill="#e4a488" opacity={0.35} />
        {/* brow */}
        <rect x={324} y={84} width={20} height={2} fill={C.hairShadow} />
        <rect x={326} y={82} width={14} height={1} fill={C.hair} />
        <rect x={342} y={84} width={2} height={1} fill={C.hairShadow} />
        {/* eye */}
        <rect x={326} y={93} width={18} height={8} fill="#c78a76" opacity={0.9} />
        <rect x={327} y={94} width={16} height={1} fill={C.hairShadow} />
        <rect x={326} y={95} width={2} height={1} fill={C.hairShadow} />
        {blink ? (
          <rect x={328} y={97} width={14} height={2} fill="#b87463" />
        ) : (
          <>
            <rect x={328} y={96} width={14} height={3} fill={C.paper} opacity={0.92} />
            <rect x={336} y={95} width={5} height={5} fill={C.cyanDim} />
            <rect x={337} y={96} width={3} height={3} fill={C.cyan} />
            <rect x={338} y={96} width={1} height={1} fill={C.cyanHi} />
            <rect x={340} y={97} width={1} height={1} fill={C.white} opacity={0.9} />
            <rect x={327} y={99} width={15} height={1} fill="#b87463" opacity={0.8} />
            <rect x={328} y={95} width={13} height={1} fill={C.hairShadow} opacity={0.75} />
          </>
        )}
        <rect x={326} y={101} width={18} height={1} fill={C.skinShadow} opacity={0.55} />
        <rect x={334} y={104} width={1} height={1} fill={C.hairShadow} opacity={0.5} />
        {tear ? (
          <g>
            <rect x={330} y={104} width={2} height={3} fill={C.cyanHi} opacity={0.9} />
            <rect x={331} y={107} width={1} height={2} fill={C.cyan} opacity={0.7} />
            <rect x={330} y={110} width={1} height={1} fill={C.cyan} opacity={0.4} />
          </g>
        ) : null}
        {/* nose, lips, jaw */}
        <rect x={350} y={91} width={4} height={23} fill={C.skinHi} opacity={0.25} />
        <rect x={353} y={112} width={5} height={4} fill="#eca98d" opacity={0.8} />
        <rect x={357} y={122} width={4} height={2} fill="#d28b73" opacity={0.7} />
        <rect x={355} y={124} width={1} height={1} fill="#8d4f46" opacity={0.8} />
        <rect x={344} y={139} width={13} height={2} fill="#a9605d" />
        <rect x={347} y={141} width={10} height={4} fill="#d98e7d" />
        <rect x={349} y={143} width={7} height={1} fill={C.skinHi} opacity={0.55} />
        <rect x={340} y={148} width={7} height={1} fill="#b87463" opacity={0.6} />
        <rect x={336} y={162} width={11} height={2} fill="#cf8f77" opacity={0.65} />
        <rect x={333} y={165} width={7} height={2} fill="#c27d68" opacity={0.55} />
        <rect x={343} y={152} width={2} height={1} fill={C.skinShadow} opacity={0.8} />
        {/* blush and light */}
        <rect x={320} y={112} width={8} height={3} fill="#e39b8b" opacity={0.28} />
        <rect x={352} y={104} width={3} height={2} fill={C.skinHi} opacity={0.45} />
        <rect x={348} y={129} width={4} height={2} fill={C.skinHi} opacity={0.35} />
        <rect x={341} y={88} width={2} height={1} fill="#e3a58b" opacity={0.8} />
        <rect x={345} y={170} width={10} height={1} fill="#e4a58b" opacity={0.55} />
      </g>
      {/* hair in front / bangs */}
      <g transform={`translate(0 ${breathe})`}>
        <path d="M 298 53 L 344 53 L 344 60 L 350 60 L 349 77 L 338 80 L 331 69 L 316 82 L 305 97 L 300 75 Z" fill={C.hair} />
        <path d="M 305 54 L 340 54 L 338 62 L 322 66 L 309 79 Z" fill={C.hairHi} opacity={0.6} />
        <path d="M 294 87 L 309 87 L 307 117 L 300 127 L 292 111 Z" fill={C.hair} />
        <path d="M 282 39 L 316 29 L 322 33 L 309 40 L 301 51 L 286 49 Z" fill={C.hairHi} opacity={0.45} />
        {/* magenta rim light from the city */}
        <path d="M 332 39 L 344 53 L 343 70 L 334 77 L 326 67 L 320 77 L 315 77 Z" fill={rimColor} opacity={rim} />
        <rect x={322} y={60} width={2} height={2} fill={C.cyanHi} opacity={0.25} />
      </g>
      {/* hair texture — strands, nicks and city light in the dark */}
      <g transform={`translate(0 ${breathe})`}>
        <path
          d="M 153 110 L 160 80 L 178 55 L 207 36 L 247 28 L 286 35 L 315 53 L 301 57 L 271 46 L 238 44 L 207 57 L 184 79 L 170 109 L 166 144 Z"
          fill={C.hairHi}
          opacity={0.36}
        />
        <path d="M 170 58 L 195 36 L 226 26 L 260 27 L 292 39 L 280 44 L 249 35 L 216 39 L 190 57 Z" fill="#5a5277" opacity={0.35} />
        <path d="M 151 113 L 152 161 L 158 177 L 159 137 L 158 108 Z" fill="#4b4366" opacity={0.4} />
        <rect x={166} y={128} width={2} height={46} fill={C.hairHi} opacity={0.3} />
        <rect x={172} y={106} width={2} height={27} fill="#4b4366" opacity={0.5} />
        <rect x={180} y={88} width={2} height={19} fill={C.hairHi} opacity={0.25} />
        <rect x={162} y={174} width={5} height={2} fill={C.hairShadow} />
        <rect x={156} y={194} width={8} height={2} fill={C.hairHi} opacity={0.2} />
        <rect x={142} y={154} width={2} height={7} fill={C.hairHi} opacity={0.25} />
        <rect x={144} y={164} width={2} height={5} fill={C.hairHi} opacity={0.2} />
        <rect x={149} y={135} width={1} height={4} fill={C.cyan} opacity={0.18} />
        <rect x={146} y={116} width={1} height={3} fill={C.cyan} opacity={0.22} />
        <rect x={158} y={96} width={1} height={3} fill={C.cyan} opacity={0.2} />
        {/* wet hair glints */}
        <rect x={170} y={62} width={3} height={1} fill={C.cyanHi} opacity={0.25} />
        <rect x={203} y={39} width={4} height={1} fill={C.white} opacity={0.18} />
        <rect x={187} y={74} width={2} height={2} fill={C.cyan} opacity={0.2} />
        <rect x={165} y={119} width={1} height={1} fill={C.cyanHi} opacity={0.3} />
      </g>
      {/* headphones */}
      <g transform={`translate(0 ${breathe})`}>
        <path d="M 234 103 L 234 90 L 242 68 L 259 49 L 279 37 L 303 35 L 318 44 L 316 51 L 296 47 L 276 56 L 260 73 L 252 96 L 252 116 Z" fill="#151a2d" />
        <path d="M 238 94 L 243 73 L 258 55 L 278 45 L 299 44 L 300 48 L 279 52 L 260 63 L 249 85 L 247 105 Z" fill={C.cyanDim} opacity={0.7} />
        <path d="M 247 98 L 298 98 L 304 108 L 304 148 L 296 160 L 250 160 L 240 148 L 238 112 Z" fill="#101626" />
        <rect x={246} y={101} width={51} height={52} fill="#19253d" />
        <rect x={246} y={101} width={51} height={3} fill={C.cyan} opacity={0.65} />
        <rect x={250} y={108} width={42} height={38} fill={C.cyan} opacity={0.12} />
        <rect x={252} y={110} width={38} height={2} fill={C.cyan} opacity={0.55} />
        <rect x={255} y={120} width={26} height={3} fill={C.cyanDim} opacity={0.7} />
        <rect x={255} y={128} width={19} height={2} fill={C.cyanDim} opacity={0.45} />
        <rect x={290} y={123} width={4} height={4} fill={Math.floor(frame / 18) % 2 ? C.cyanHi : C.cyanDim} />
        <g transform="translate(262 129)" opacity={0.7}>
          <rect x={0} y={2} width={2} height={1} fill={C.cyan} />
          <rect x={2} y={0} width={7} height={5} fill={C.cyanDim} />
          <rect x={4} y={2} width={2} height={1} fill={C.night0} />
          <rect x={1} y={3} width={3} height={1} fill={C.cyan} />
        </g>
        <rect x={244} y={156} width={58} height={5} fill={C.hairShadow} />
        {/* cable */}
        <path d="M 255 160 L 260 181 L 273 207 L 276 231" fill="none" stroke="#101626" strokeWidth={2} />
        <path d="M 258 162 L 263 182 L 276 210" fill="none" stroke={C.cyanDim} strokeWidth={1} opacity={0.4} />
        {/* yellow hood rim behind headphones */}
        <path d="M 218 210 L 246 199 L 270 210 L 276 236 L 251 251 L 221 242 Z" fill={C.yellowDim} />
        <path d="M 224 212 L 248 204 L 265 213 L 268 232 L 250 243 L 228 236 Z" fill={C.yellow} />
      </g>
      {/* glass, rain and breath */}
      <g>
        {Array.from({length: 4}, (_, i) => {
          const cycle = 74;
          const progress = ((frame + i * 21) % cycle) / cycle;
          if (progress > 0.72) return null;
          const alpha = Math.sin((progress / 0.72) * Math.PI) * 0.16;
          return (
            <g key={i} opacity={alpha}>
              <rect x={365 + progress * 46} y={151 - progress * 15} width={5 + Math.round(progress * 5)} height={2} fill={C.paper} />
              <rect x={370 + progress * 52} y={148 - progress * 17} width={4 + Math.round(progress * 5)} height={2} fill={C.cyanHi} />
              <rect x={376 + progress * 55} y={153 - progress * 12} width={3 + Math.round(progress * 4)} height={1} fill={C.paper} opacity={0.7} />
            </g>
          );
        })}
        {glassDrops.map((drop, i) => {
          const fall = (frame * drop.s + i * 31) % 36;
          return (
            <g key={i} opacity={0.32}>
              <rect x={drop.x} y={drop.y + fall} width={drop.w} height={drop.h} fill={C.blueHi} />
              <rect x={drop.x} y={drop.y + fall} width={drop.w} height={2} fill={C.cyanHi} opacity={0.8} />
              <rect x={drop.x + drop.w} y={drop.y + fall + 4} width={1} height={drop.h} fill={C.blueHi} opacity={0.3} />
            </g>
          );
        })}
        <rect x={0} y={0} width={480} height={270} fill={C.blue} opacity={0.035} />
        <rect x={0} y={0} width={480} height={1} fill={C.cyanHi} opacity={0.1} />
      </g>
      <rect x={0} y={0} width={480} height={270} fill={mixColor(C.blue, C.magenta, neonFlicker ? 0.22 : 0.03)} opacity={0.07} />
    </SceneSvg>
  );
};
