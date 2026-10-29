import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {C, CN_FONT, EN_FONT, clamp01} from '../theme';
import {SUBTITLES} from '../timeline';
import {GlitchBars, Hud} from './Primitives';

const textShadow = '4px 4px 0 #050711, 0 0 28px rgba(2,4,12,0.75)';
const smallShadow = '2px 2px 0 #050711, 0 0 12px rgba(2,4,12,0.9)';

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [16, 34, 164, 184], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rise = interpolate(frame, [16, 40], [18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const lineW = interpolate(frame, [30, 60], [0, 180], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glitch = (frame > 72 && frame < 75) || (frame > 151 && frame < 153);
  const jitter = glitch ? (frame % 2 ? 5 : -4) : 0;
  return (
    <AbsoluteFill style={{zIndex: 44, pointerEvents: 'none', opacity}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${rise}px)`,
          color: C.white,
        }}
      >
        <div
          style={{
            fontFamily: EN_FONT,
            fontSize: 15,
            letterSpacing: '0.18em',
            color: C.cyan,
            opacity: 0.8,
            marginBottom: 42,
          }}
        >
          A FAN-MADE PIXEL STORY
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 58,
            fontFamily: CN_FONT,
            fontSize: 240,
            lineHeight: 0.92,
            color: C.paper,
            textShadow,
            transform: `translateX(${jitter}px)`,
            letterSpacing: 0,
          }}
        >
          <span>同</span>
          <span style={{color: C.yellow, textShadow: '6px 6px 0 #080a14'}}>类</span>
        </div>
        <div
          style={{
            fontFamily: EN_FONT,
            fontSize: 30,
            letterSpacing: '0.42em',
            color: C.white,
            textShadow: smallShadow,
            marginTop: 38,
            paddingLeft: '0.42em',
          }}
        >
          KINDRED
        </div>
        <div
          style={{
            width: lineW,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`,
            marginTop: 36,
            marginBottom: 30,
          }}
        />
        <div
          style={{
            fontFamily: CN_FONT,
            fontSize: 34,
            color: '#e5dfce',
            textShadow: smallShadow,
            letterSpacing: '0.06em',
          }}
        >
          献给每一个，在人群里寻找回声的人。
        </div>
        <div
          style={{
            marginTop: 42,
            fontFamily: CN_FONT,
            fontSize: 20,
            color: C.cyan,
            opacity: 0.7,
            letterSpacing: '0.06em',
          }}
        >
          词 易家扬 · 曲 李偲菘 · 编曲 Terence Teo · 原唱 孙燕姿
        </div>
        <div
          style={{
            marginTop: 9,
            fontFamily: CN_FONT,
            fontSize: 17,
            color: '#9d9a90',
            opacity: 0.7,
            letterSpacing: '0.06em',
          }}
        >
          词意影像 · 像素动画 · 非官方同人 MV
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 96,
          bottom: 98,
          fontFamily: CN_FONT,
          fontSize: 19,
          color: C.paper,
          opacity: 0.42,
          textAlign: 'right',
          lineHeight: 1.8,
        }}
      >
        <div>一个关于雨夜、等待</div>
        <div>与相遇的像素故事</div>
      </div>
    </AbsoluteFill>
  );
};

const SubtitleLine: React.FC<{lines: string[]; label?: string; duration: number}> = ({lines, label, duration}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rise = interpolate(frame, [0, 14], [10, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill
      style={{
        zIndex: 43,
        pointerEvents: 'none',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 88,
        opacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 300,
          background: 'linear-gradient(to top, rgba(9,6,4,0.84), rgba(9,6,4,0.32) 58%, transparent)',
        }}
      />
      <div style={{position: 'relative', textAlign: 'center', transform: `translateY(${rise}px)`}}>
        {label ? (
          <div
            style={{
              fontFamily: EN_FONT,
              fontSize: 13,
              color: C.cyan,
              opacity: 0.85,
              letterSpacing: '0.12em',
              marginBottom: 17,
              textShadow: smallShadow,
            }}
          >
            <span style={{color: C.magenta}}>◆</span> {label}
          </div>
        ) : null}
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: CN_FONT,
              fontSize: 36,
              lineHeight: 1.55,
              color: i === 0 ? '#fff7e5' : '#f0e5cf',
              letterSpacing: '0.055em',
              textShadow: '2px 2px 0 #050302, 0 0 16px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Subtitles: React.FC = () => (
  <>
    {SUBTITLES.map((sub, i) => (
      <Sequence key={i} from={sub.from} durationInFrames={sub.to - sub.from} premountFor={24}>
        <SubtitleLine lines={sub.lines} label={sub.label} duration={sub.to - sub.from} />
      </Sequence>
    ))}
  </>
);

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 4752;
  const end = 5105;
  if (frame < start) return null;
  const local = frame - start;
  const duration = end - start;
  const opacity = interpolate(local, [0, 24, duration - 20, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const credits = interpolate(local, [18, 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{zIndex: 60, backgroundColor: `rgba(3,4,9,${opacity})`, pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: C.paper,
          opacity,
        }}
      >
        <div style={{fontFamily: CN_FONT, fontSize: 16, color: C.cyan, letterSpacing: '0.2em', opacity: 0.7}}>
          尾聲 / 同類
        </div>
        <div
          style={{
            fontFamily: CN_FONT,
            fontSize: 158,
            lineHeight: 1,
            marginTop: 22,
            textShadow: '5px 5px 0 #050711, 0 0 40px rgba(99,216,210,0.12)',
          }}
        >
          同<span style={{color: C.yellow}}>类</span>
        </div>
        <div style={{fontFamily: EN_FONT, fontSize: 21, letterSpacing: '0.42em', marginTop: 20, paddingLeft: '0.42em'}}>
          KINDRED
        </div>
        <div style={{width: 120, height: 1, background: C.cyan, opacity: 0.45, margin: '27px 0 21px'}} />
        <div style={{fontFamily: CN_FONT, fontSize: 33, color: '#e8e1d0', letterSpacing: '0.06em'}}>
          愿你找到，那个懂你沉默的人。
        </div>
        <div style={{opacity: credits, marginTop: 38, textAlign: 'center', lineHeight: 1.9}}>
          <div style={{fontFamily: CN_FONT, fontSize: 11, color: C.cyan, letterSpacing: '0.2em'}}>
            音樂
          </div>
          <div style={{fontFamily: CN_FONT, fontSize: 21, color: C.paper, marginTop: 5}}>
            孙燕姿《同类》 · 词 易家扬 / 曲 李偲菘 / 编曲 Terence Teo
          </div>
          <div
            style={{
              width: 280,
              height: 1,
              background: C.cyan,
              opacity: 0.2,
              margin: '17px auto 14px',
            }}
          />
          <div style={{fontFamily: CN_FONT, fontSize: 11, color: C.cyan, letterSpacing: '0.2em'}}>
            影像
          </div>
          <div style={{fontFamily: CN_FONT, fontSize: 18, color: '#9b9a92', marginTop: 5}}>
            故事 / 分镜 / 像素动画 · MADE WITH REMOTION
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 58,
            fontFamily: CN_FONT,
            fontSize: 15,
            color: '#777a7d',
            letterSpacing: '0.03em',
            textAlign: 'center',
            opacity: credits * 0.85,
            lineHeight: 1.8,
          }}
        >
          非官方同人 MV · 音乐及歌词版权归原权利人所有 · 请勿用于商业用途
          <br />
          FAN-MADE, NOT AFFILIATED WITH THE ARTIST OR LABEL
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const GlobalChrome: React.FC<{label: string}> = ({label}) => {
  const frame = useCurrentFrame();
  const hudFade = interpolate(frame, [4660, 4740, 4770, 4810], [1, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glitchAmount =
    (frame > 416 && frame < 432) ||
    (frame > 648 && frame < 664) ||
    (frame > 1528 && frame < 1544) ||
    (frame > 2020 && frame < 2036) ||
    (frame > 3294 && frame < 3310) ||
    (frame > 4030 && frame < 4046)
      ? 0.6
      : 0;
  return (
    <>
      {hudFade > 0 ? (
        <div style={{opacity: hudFade, position: 'absolute', inset: 0}}>
          <Hud label={label} opacity={0.68} />
        </div>
      ) : null}
      <GlitchBars frame={frame} strength={glitchAmount} />
    </>
  );
};
