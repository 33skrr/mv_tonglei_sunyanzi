import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useDelayRender} from 'remotion';
import {C, CN_FONT, EN_FONT} from './theme';
import {DURATION_IN_FRAMES, SCENES, sceneDuration} from './timeline';
import {TitleScene} from './scenes/TitleScene';
import {CityScene, CrowdScene} from './scenes/CityScene';
import {EmptySeatScene} from './scenes/EmptySeatScene';
import {PortraitSceneV2 as PortraitScene} from './scenes/PortraitSceneV2';
import {RoomScene} from './scenes/RoomScene';
import {AlleyScene} from './scenes/AlleyScene';
import {SubwayScene} from './scenes/SubwayScene';
import {RooftopArrival, RooftopTogether} from './scenes/RooftopScene';
import {BridgeScene} from './scenes/BridgeScene';
import {EndScene} from './scenes/EndScene';
import {CrtOverlay} from './components/Primitives';
import {EndCard, Subtitles, TitleCard} from './components/Overlay';

const FONT_LABEL = 'load 8-bit fonts';

const SceneFade: React.FC<{duration: number; children: React.ReactNode}> = ({duration, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

const sceneLabel = (frame: number) => {
  if (frame < SCENES.city.from) return 'PROLOGUE';
  if (frame < SCENES.crowd.from) return '01 / RAIN CITY';
  if (frame < SCENES.seat.from) return '02 / CROWD';
  if (frame < SCENES.portrait.from) return '03 / EMPTY SEAT';
  if (frame < SCENES.room.from) return '04 / STATIC';
  if (frame < SCENES.alley.from) return '05 / 88.7 MHZ';
  if (frame < SCENES.subway.from) return '06 / FOLLOW';
  if (frame < SCENES.roofArrival.from) return '07 / LAST TRAIN';
  if (frame < SCENES.roofTogether.from) return '08 / ROOFTOP';
  if (frame < SCENES.bridge.from) return '09 / SAME FREQUENCY';
  if (frame < SCENES.end.from) return '10 / CLOUDS';
  return '11 / FIRST LIGHT';
};

export const KindredMV: React.FC = () => {
  const frame = useCurrentFrame();
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [fontHandle] = useState(() => delayRender(FONT_LABEL));
  const [fontTick, setFontTick] = useState(0);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        await document.fonts.ready;
        await Promise.all([
          document.fonts.load('48px "Fusion Pixel 12px Proportional SC"', '同类献给每一个在人群里寻找回声的人'),
          document.fonts.load('24px "Press Start 2P"', 'KINDRED'),
        ]);
        await document.fonts.ready;
        await new Promise((resolve) => setTimeout(resolve, 80));
        if (alive) {
          continueRender(fontHandle);
          setFontTick((t) => t + 1);
        }
      } catch (err) {
        if (alive) cancelRender(err);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [cancelRender, continueRender, fontHandle]);

  const scenes = useMemo(
    () => [
      {key: 'title', from: SCENES.title.from, to: SCENES.title.to, render: () => <TitleScene />},
      {key: 'city', from: SCENES.city.from, to: SCENES.city.to, render: () => <CityScene duration={sceneDuration('city')} />},
      {key: 'crowd', from: SCENES.crowd.from, to: SCENES.crowd.to, render: () => <CrowdScene duration={sceneDuration('crowd')} />},
      {key: 'seat', from: SCENES.seat.from, to: SCENES.seat.to, render: () => <EmptySeatScene duration={sceneDuration('seat')} />},
      {key: 'portrait', from: SCENES.portrait.from, to: SCENES.portrait.to, render: () => <PortraitScene />},
      {key: 'room', from: SCENES.room.from, to: SCENES.room.to, render: () => <RoomScene duration={sceneDuration('room')} />},
      {key: 'alley', from: SCENES.alley.from, to: SCENES.alley.to, render: () => <AlleyScene duration={sceneDuration('alley')} />},
      {key: 'subway', from: SCENES.subway.from, to: SCENES.subway.to, render: () => <SubwayScene duration={sceneDuration('subway')} />},
      {key: 'roofArrival', from: SCENES.roofArrival.from, to: SCENES.roofArrival.to, render: () => <RooftopArrival duration={sceneDuration('roofArrival')} />},
      {key: 'roofTogether', from: SCENES.roofTogether.from, to: SCENES.roofTogether.to, render: () => <RooftopTogether duration={sceneDuration('roofTogether')} />},
      {key: 'bridge', from: SCENES.bridge.from, to: SCENES.bridge.to, render: () => <BridgeScene />},
      {key: 'end', from: SCENES.end.from, to: SCENES.end.to, render: () => <EndScene duration={sceneDuration('end')} />},
    ],
    [],
  );

  return (
    <AbsoluteFill style={{backgroundColor: C.black, fontFamily: CN_FONT}}>
      <Audio src={staticFile('audio/source.mp3')} volume={0.767} />
      {scenes.map((scene) => (
        <Sequence
          key={scene.key}
          from={scene.from}
          durationInFrames={scene.to - scene.from}
          premountFor={24}
          name={scene.key}
        >
          <SceneFade duration={scene.to - scene.from}>{scene.render()}</SceneFade>
        </Sequence>
      ))}
      <AbsoluteFill
        style={{
          zIndex: 39,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(3,5,14,0.28) 0%, transparent 22%, transparent 74%, rgba(3,5,14,0.5) 100%)',
        }}
      />
      <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
        <CrtOverlay />
      </AbsoluteFill>
      <TitleCard />
      <Subtitles />
      <EndCard />
      {/* final fade to black */}
      <AbsoluteFill
        style={{
          zIndex: 70,
          pointerEvents: 'none',
          backgroundColor: C.black,
          opacity: interpolate(frame, [DURATION_IN_FRAMES - 20, DURATION_IN_FRAMES], [0, 0.82], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <div style={{display: 'none'}} data-font-tick={fontTick} data-fonts={EN_FONT} />
    </AbsoluteFill>
  );
};
