import React from 'react';

import { Text } from 'design';
import styled from 'styled-components';

import { hasActiveChildren } from 'teleport/Discover/flow';

import { StepList } from './StepList';

import type { View } from 'teleport/Discover/flow';

interface StepItemProps {
  view: View;
  currentStep: number;
}

export function StepItem(props: StepItemProps) {
  if (props.view.hide) {
    return null;
  }

  let list;
  let isActive = props.currentStep === props.view.index;
  if (props.view.views) {
    if (!isActive) {
      isActive = hasActiveChildren(props.view.views, props.currentStep);
    }

    if (isActive) {
      list = (
        <StepList views={props.view.views} currentStep={props.currentStep} />
      );
    }
  }

  const isDone = props.currentStep > props.view.index;

  return (
    <StepsContainer active={isDone || isActive}>
      <StepTitle>
        {getBulletIcon(isDone, isActive)}

        {props.view.title}
      </StepTitle>

      {list}
    </StepsContainer>
  );
}

function getBulletIcon(isDone: boolean, isActive: boolean) {
  if (isActive) {
    return <ActiveBullet />;
  }

  if (isDone) {
    return <CheckedBullet />;
  }

  return <Bullet />;
}

const StepTitle = styled.div`
  display: flex;
  align-items: center;
`;

const Bullet = styled.span`
  height: 14px;
  width: 14px;
  border: 1px solid #9b9b9b;
  border-radius: 50%;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActiveBullet = styled(Bullet)`
  border-color: ${props => props.theme.colors.secondary.main};
  background: ${props => props.theme.colors.secondary.main};

  :before {
    content: '';
    height: 8px;
    width: 8px;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.colors.primary.main};
  }
`;

const CheckedBullet = styled(Bullet)`
  border-color: ${props => props.theme.colors.secondary.main};
  background: ${props => props.theme.colors.secondary.main};

  :before {
    content: '✓';
  }
`;

const StepsContainer = styled<{ active: boolean }>(Text)`
  display: flex;
  flex-direction: column;
  color: ${p => (p.active ? 'inherit' : p.theme.colors.text.secondary)};
  margin-bottom: 8px;
`;
