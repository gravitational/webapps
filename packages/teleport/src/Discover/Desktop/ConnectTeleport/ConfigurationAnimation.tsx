import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SwitchTransition, Transition } from 'react-transition-group';

import * as Icons from 'design/Icon';

import { CreateTeleportConfigAnimation } from 'teleport/Discover/Desktop/ConnectTeleport/CreateTeleportConfigAnimation';

enum AnimationSteps {
  Terminal,
  Editor,
  RestartTeleport,
}

const steps = [
  {
    kind: AnimationSteps.Terminal,
    length: 10000,
  },
  {
    kind: AnimationSteps.Editor,
    length: 8000,
  },
  {
    kind: AnimationSteps.RestartTeleport,
    length: 10000,
  },
];

const defaultStyle = {
  transition: 'opacity 250ms, transform 250ms',
  opacity: 0,
  width: '100%',
};

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateX(50px)' },
  entered: { opacity: 1, transform: 'translateX(0%)' },
  exiting: { opacity: 0, transform: 'translateX(-50px)' },
  exited: { opacity: 0, transform: 'translateX(-50px)' },
};

export function ConfigurationAnimation() {
  const [animationStep, setAnimationStep] = useState(AnimationSteps.Terminal);

  const step = steps.find(s => s.kind === animationStep);
  const stepIndex = steps.findIndex(s => s.kind === animationStep);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (stepIndex + 1 >= steps.length) {
        setAnimationStep(AnimationSteps.Terminal);

        return;
      }

      setAnimationStep(steps[stepIndex + 1].kind);
    }, step.length);

    return () => clearTimeout(id);
  }, [stepIndex, step]);

  return (
    <>
      <StepsContainer>
        <Step
          active={animationStep === AnimationSteps.Terminal}
          onClick={() => setAnimationStep(AnimationSteps.Terminal)}
        >
          <StepIcon>
            <Icons.Terminal />
          </StepIcon>
          1. Run the configure AD script
        </Step>
        <Step
          active={animationStep === AnimationSteps.Editor}
          onClick={() => setAnimationStep(AnimationSteps.Editor)}
        >
          <StepIcon>
            <Icons.Code />
          </StepIcon>
          2. Edit teleport.yaml
        </Step>
        <Step
          active={animationStep === AnimationSteps.RestartTeleport}
          onClick={() => setAnimationStep(AnimationSteps.RestartTeleport)}
        >
          <StepIcon></StepIcon>
          3. Restart Teleport
        </Step>
      </StepsContainer>

      <ContentContainer>
        <AnimationContainer>
          <SwitchTransition mode="out-in">
            <Transition
              key={animationStep}
              timeout={250}
              mountOnEnter
              unmountOnExit
            >
              {state => (
                <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                  {animationStep === AnimationSteps.Editor && (
                    <CreateTeleportConfigAnimation />
                  )}
                </div>
              )}
            </Transition>
          </SwitchTransition>
        </AnimationContainer>
      </ContentContainer>
    </>
  );
}

const ContentContainer = styled.div`
  height: 420px;
  position: relative;
  width: calc(100% - 100px);
  overflow: hidden;
  padding: 20px 100px;
  left: 100px;
`;

const AnimationContainer = styled.div`
  height: 420px;
  position: absolute;
  width: calc(100% - 200px);

  > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StepIcon = styled.div`
  font-size: 30px;
  margin-right: 10px;
`;

const StepsContainer = styled.div`
  display: flex;
  width: calc(100% - 90px);
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const Step = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 10px;
  transition: 0.2s ease-in opacity;
  cursor: pointer;
  opacity: ${p => (p.active ? 1 : 0.5)};

  &:hover {
    opacity: ${p => (p.active ? 1 : 0.8)};
  }
`;
