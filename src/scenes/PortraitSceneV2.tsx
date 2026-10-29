import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {EmptySeatScene} from './EmptySeatScene';

/**
 * The old 0:42 portrait was a large hand-drawn side profile that read poorly
 * at 1080p. This is now a slow push-in on the same bus-shelter set: the girl
 * stays small, the clock and the paper crane carry the moment, and no giant
 * face is on screen.
 */
export const PortraitSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const push = 1.02 + 0.09 * (frame / 263);
  return (
    <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '52% 60%'}}>
      <EmptySeatScene duration={361} frameOffset={361} />
    </AbsoluteFill>
  );
};
