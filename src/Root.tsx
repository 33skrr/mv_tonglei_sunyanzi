import React from 'react';
import {Composition} from 'remotion';
import '@fontsource/fusion-pixel-12px-proportional-sc/400.css';
import '@fontsource/press-start-2p/400.css';
import {KindredMV} from './KindredMV';
import {DURATION_IN_FRAMES, FPS} from './timeline';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="KindredMV"
      component={KindredMV}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};
