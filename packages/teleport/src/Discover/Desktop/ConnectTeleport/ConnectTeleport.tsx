/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Suspense, useState } from 'react';
import styled from 'styled-components';

import { SwitchTransition, Transition } from 'react-transition-group';

import { Window } from 'shared/components/Window';

import {
  RunConfigureScript,
  RunConfigureScriptLoading,
} from 'teleport/Discover/Desktop/ConnectTeleport/RunConfigureScript';
import { StepContainer } from 'teleport/Discover/Desktop/ConnectTeleport/Step';
import { RunConfigureScriptAnimation } from 'teleport/Discover/Desktop/ConnectTeleport/RunConfigureScriptAnimation';
import { CreateTeleportConfigAnimation } from 'teleport/Discover/Desktop/ConnectTeleport/CreateTeleportConfigAnimation';
import { StartTeleportTerminalAnimation } from 'teleport/Discover/Desktop/ConnectTeleport/StartTeleportTerminalAnimation';
import { CopyOutput } from 'teleport/Discover/Desktop/ConnectTeleport/CopyOutput';
import { CreateConfig } from 'teleport/Discover/Desktop/ConnectTeleport/CreateConfig';
import { StartTeleport } from 'teleport/Discover/Desktop/ConnectTeleport/StartTeleport';

enum StepKind {
  RunConfigureScript,
  CopyOutput,
  CreateConfig,
  StartTeleport,
  Finished,
}

enum Animation {
  RunCommand,
  CreateConfig,
  StartTeleport,
}

interface Step {
  kind: StepKind;
  animation: Animation;
}

const steps: Step[] = [
  {
    kind: StepKind.RunConfigureScript,
    animation: Animation.RunCommand,
  },
  {
    kind: StepKind.CopyOutput,
    animation: Animation.RunCommand,
  },
  {
    kind: StepKind.CreateConfig,
    animation: Animation.CreateConfig,
  },
  {
    kind: StepKind.StartTeleport,
    animation: Animation.StartTeleport,
  },
  {
    kind: StepKind.Finished,
    animation: null,
  },
];

const defaultStyle = {
  transition: 'opacity 250ms, transform 250ms',
  opacity: 0,
  width: '100%',
};

const horizontalTransitionStyles = {
  entering: { opacity: 0, transform: 'translateX(50px)' },
  entered: { opacity: 1, transform: 'translateX(0%)' },
  exiting: { opacity: 0, transform: 'translateX(-50px)' },
  exited: { opacity: 0, transform: 'translateX(-50px)' },
};

const verticalTransitionStyles = {
  entering: { opacity: 0, transform: 'translateY(50px)' },
  entered: { opacity: 1, transform: 'translateY(0%)' },
  exiting: { opacity: 0, transform: 'translateY(-50px)' },
  exited: { opacity: 0, transform: 'translateY(-50px)' },
};

import { State } from 'teleport/Discover/useDiscover';

export function ConnectTeleport(props: State) {
  const [currentStep, setCurrentStep] = useState(StepKind.RunConfigureScript);
  const step = steps.find(s => s.kind === currentStep);

  let animation;
  if (step.animation !== null) {
    animation = (
      <ContentContainer>
        <AnimationContainer>
          <SwitchTransition mode="out-in">
            <Transition
              key={step.animation}
              timeout={250}
              mountOnEnter
              unmountOnExit
            >
              {state => (
                <div
                  style={{
                    ...defaultStyle,
                    ...horizontalTransitionStyles[state],
                  }}
                >
                  {step.animation === Animation.RunCommand && (
                    <Suspense fallback={<Window title="Terminal" />}>
                      <RunConfigureScriptAnimation
                        isCopying={step.kind === StepKind.CopyOutput}
                      />
                    </Suspense>
                  )}
                  {step.animation === Animation.CreateConfig && (
                    <CreateTeleportConfigAnimation />
                  )}
                  {step.animation === Animation.StartTeleport && (
                    <StartTeleportTerminalAnimation />
                  )}
                </div>
              )}
            </Transition>
          </SwitchTransition>
        </AnimationContainer>
      </ContentContainer>
    );
  }

  return (
    <StepContainer>
      <SwitchTransition mode="out-in">
        <Transition key={currentStep} timeout={250} mountOnEnter unmountOnExit>
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...verticalTransitionStyles[state],
              }}
            >
              {currentStep === StepKind.RunConfigureScript && (
                <Suspense fallback={<RunConfigureScriptLoading />}>
                  <RunConfigureScript
                    onNext={() => setCurrentStep(StepKind.CopyOutput)}
                  />
                </Suspense>
              )}
              {currentStep === StepKind.CopyOutput && (
                <CopyOutput
                  onNext={() => setCurrentStep(StepKind.CreateConfig)}
                />
              )}
              {currentStep === StepKind.CreateConfig && (
                <CreateConfig
                  onNext={() => setCurrentStep(StepKind.StartTeleport)}
                />
              )}
              {currentStep === StepKind.StartTeleport && (
                <StartTeleport onNext={() => props.nextStep()} />
              )}
            </div>
          )}
        </Transition>
      </SwitchTransition>

      {animation}
    </StepContainer>
  );
}

const AnimationContainer = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  max-width: 875px;
  flex: 1 0 850px;
  align-items: flex-end;
  margin-left: -101px;
  position: relative;
  z-index: 1;
  padding-right: 20px;
`;

const ContentContainer = styled.div`
  position: relative;
  width: calc(100% - 100px);
  padding: 20px 100px;
  left: 100px;
`;
