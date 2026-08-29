import React from 'react';
import { StageId } from '../types';
import { KidScaleActivity } from './KidScaleActivity';
import { TeenDecisionMatrix } from './TeenDecisionMatrix';

interface InteractiveScaleProps {
  currentStage: StageId;
}

export const InteractiveScale: React.FC<InteractiveScaleProps> = ({ currentStage }) => {
  if (currentStage === 'stage1') {
    return <KidScaleActivity />;
  }

  return <TeenDecisionMatrix />;
};
