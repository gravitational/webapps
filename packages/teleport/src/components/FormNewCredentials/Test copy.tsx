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
import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import {
  Transition,
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import styled from 'styled-components';
import { findDOMNode } from 'react-dom';
import { Text, Card, ButtonPrimary, Flex, Box, Link } from 'design';
import * as Alerts from 'design/Alert';
import { Key, ArrowForward } from 'design/Icon';
import { AuthType, Auth2faType, PreferredMfaType } from 'shared/services';
import { Attempt } from 'shared/hooks/useAttemptNext';
import FieldSelect from 'shared/components/FieldSelect';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import {
  requiredToken,
  requiredPassword,
  requiredConfirmedPassword,
} from 'shared/components/Validation/rules';
import createMfaOptions, { MfaOption } from 'shared/utils/createMfaOptions';

export const AnimateItem = () => {
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(0);
  const [defaultFlow, setDefaultFlow] = useState('local');
  const [className, setClassName] = useState('forwards');
  const [appearOnMount, setAppearOnMount] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const refs = useRef([]);

  // set height and width
  function setDimension(height, width) {
    // console.log(width, height);
    // setHeight(height);
    // setWidth(width);
  }

  function setDimensions(node: HtmlElement, isAppearing: boolean) {
    console.log('****', node.clientHeight);
    console.log('****', node.clientWidth);
    setHeight(node.clientHeight);
    setWidth(node.clientWidth);
  }

  let $content;
  const Step = steps[defaultFlow][step];
  if (Step) {
    $content = (
      <Step
        // ref={myRef}
        key={step}
        onSize={setDimension}
        // classes={classes}
        onSubmit={(e: Event) => {
          e.preventDefault();
          console.log('---- HURRAY!');
        }}
        onNext={(e: Event) => {
          // apply class forward
          e.preventDefault();
          setStep(step + 1);
          setClassName('forwards');
          setAppearOnMount(false); // do animations on initla render
        }}
        onPrev={(e: Event) => {
          // apply class backward
          e.preventDefault();
          setStep(step - 1);
          setClassName('backwards');
          setAppearOnMount(false); // do animations on initla render
        }}
        onSwitch={(flow, isBack = false) => {
          if (isBack) {
            setClassName('backwards');
          } else {
            setClassName('forwards');
          }
          setDefaultFlow(flow);
          setStep(0);
          setAppearOnMount(true); // do animations on initla render
        }}
      />
    );
  }

  useEffect(() => {
    console.log('---- refs: ', refs);
    console.log('---- height w: ', refs.current[step].clientHeight);
    console.log('---- width: ', refs.current[step].clientWidth);
    setHeight(refs.current[step].clientHeight);
    const child = React.Children.only(steps['pwdless'][0]);
    console.log('--- child: ', child);
    // setWidth(refs.current[step].clientWidth);
  }, []);

  const onRefChange = useCallback(node => {
    console.log('0---- here i ma', node);
    if (node === null) {
      // DOM node referenced by ref has been unmounted
    } else {
      // DOM node referenced by ref has changed and exists
    }
  }, []); // adjust deps

  return (
    <div
      style={{
        // width: width, // this has to be the same as the child
        // height: '100%',
        width: 464,
        height: height,
        margin: '0 auto',
        background: 'red',
        overflow: 'hidden',
        position: 'relative',
        transition: 'height 500ms ease',
      }}
    >
      <Wrap className={className}>
        {/* Transition change state with `in` props */}
        <TransitionGroup component={null}>
          {steps[defaultFlow].map((El, i) => {
            const visibility = i == step ? 'visible' : 'hidden';
            return (
              <CSSTransition
                // in={true}
                // appear={true}
                timeout={{
                  appear: 500,
                  enter: 500,
                  exit: 100,
                }}
                key={i}
                classNames={`${className}-slide`}
                // onEnter={setDimensions}
                // onEntering={setDimensions}
                // onEntered={setDimensions}
                // mountOnEnter={true}
                // unmountOnExit={true}
                // addEndListener={addEndListener}
                // nodeRef={onRefChange}
              >
                <div
                  style={{ visibility }}
                  ref={node => (refs.current[i] = node)}
                >
                  <El
                    key={i}
                    // onSize={setDimension}
                    // classes={classes}
                    onSubmit={(e: Event) => {
                      e.preventDefault();
                      console.log('---- HURRAY!');
                    }}
                    onNext={(e: Event) => {
                      console.log(
                        '----- refs: ',
                        refs,
                        refs.current[i + 1].style.visibility
                      );
                      refs.current[i + 1].style.visibility = 'visible';
                      refs.current[i].style.visibility = 'hidden';
                      setHeight(refs.current[i + 1].clientHeight);
                      // apply class forward
                      e.preventDefault();
                      setStep(i + 1);
                      setClassName('forwards');
                      setAppearOnMount(false); // do animations on initla render
                    }}
                    onPrev={(e: Event) => {
                      refs.current[i - 1].style.visibility = 'visible';
                      refs.current[i].style.visibility = 'hidden';
                      setHeight(refs.current[i - 1].clientHeight);

                      // apply class backward
                      e.preventDefault();
                      setStep(i - 1);
                      setClassName('backwards');
                      setAppearOnMount(false); // do animations on initla render
                    }}
                    onSwitch={(flow, isBack = false) => {
                      if (isBack) {
                        setClassName('backwards');
                      } else {
                        setClassName('forwards');
                      }
                      setDefaultFlow(flow);
                      setStep(0);
                      setAppearOnMount(true); // do animations on initla render
                    }}
                  />
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </Wrap>
    </div>
  );
};

// const finalOuterStyle = {
//   transitionProperty: 'height',
//   transitionDuration: `300ms`,
//   overflow: 'hidden',
//   height: animateHeight && height != null ? height : undefined,
//   ...style,
// }

const Wrap = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;

  .backwards-slide-enter {
    transform: translateX(-100%);
    opacity: 0;
    position: absolute;
    // background: blue;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .backwards-slide-enter-active {
    transform: translateX(0);
    opacity: 1;
    z-index: 5;
    transition: transform 300ms ease;

    // transition: all 300ms linear 300ms;
  }
  .backwards-slide-exit {
    transform: translateX(100%);
    opacity: 1;
    // transition: all 300ms linear;
    // transition: transform 300ms ease;
  }

  .forwards-slide-enter {
    transform: translateX(100%);
    opacity: 0;
    position: absolute;
    // background: blue;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .forwards-slide-enter-active {
    transform: translateX(0);
    opacity: 1;
    // transition: all 300ms linear 300ms;
    transition: transform 300ms ease;
  }
  .forwards-slide-exit {
    transform: translateX(-100%);
    opacity: 1;

    // transition: all 300ms linear;
    // transition: transform 300ms ease;
  }
`;

export const Animation = styled.div`
  position: absolute;
  /* example for move item */

  transform: translateX(
    ${({ state }) => (state === 'entering' || state === 'entered' ? 400 : 0)}px
  );

  /* change color*/

  background: ${({ state }) => {
    switch (state) {
      case 'entering':
        return 'red';
      case 'entered':
        return 'blue';
      case 'exiting':
        return 'green';
      case 'exited':
        return 'yellow';
    }
  }};
`;

const MainStep1 = ({ onNext, onSwitch, onSize }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const ref = useRef();

  return (
    <Card as="form" bg="primary.light" my={6} mx="auto" width={464} ref={ref}>
      <Flex>
        <Box flex="3" p="6">
          <Text typography="h2" mb={3} textAlign="center" color="light">
            Step One
          </Text>

          <Text typography="h4" breakAll mb={3}>
            Lisa
          </Text>
          <Box p={5}>this is step one</Box>
          <ButtonPrimary width="100%" mt={3} size="large" onClick={onNext}>
            Next
          </ButtonPrimary>
          <ButtonPrimary
            width="200px"
            mt={5}
            size="medium"
            onClick={() => onSwitch('pwdless')}
          >
            Go to OtherFlow
          </ButtonPrimary>
        </Box>
      </Flex>
    </Card>
  );
};

const MainStep2 = ({ onNext, onPrev, onSize, myRef }) => {
  const ref = useRef();

  const [token, setToken] = useState('');
  // useLayoutEffect(() => {
  //   console.log('myRef getbounding client-----: ', myRef);

  //   onSize(
  //     ref?.current.getBoundingClientRect().height,
  //     ref?.current.getBoundingClientRect().width
  //   );
  // }, []);

  return (
    <Card as="form" bg="primary.light" my={6} mx="auto" width={464} ref={ref}>
      <Flex>
        <Box flex="3" p="6">
          <Text typography="h2" mb={3} textAlign="center" color="light">
            Step Two
          </Text>

          <Text typography="h4" breakAll mb={3}>
            Lisa
          </Text>
          <Box p={5}>this is step two</Box>
          <Box p={5}>this is step two</Box>
          <Box p={5}>this is step two</Box>
          <Box p={5}>this is step two</Box>
          <ButtonPrimary
            width="100%"
            mt={3}
            size="large"
            // do stuff, then next
            onClick={onNext}
          >
            Submit
          </ButtonPrimary>
          <ButtonPrimary width="200px" mt={5} size="medium" onClick={onPrev}>
            Back
          </ButtonPrimary>
        </Box>
      </Flex>
    </Card>
  );
};

const OtherStep1 = ({ onSwitch, onNext, onSize }) => {
  const ref = useRef();

  return (
    <Card as="form" bg="primary.light" my={6} mx="auto" width={464} ref={ref}>
      <Flex>
        <Box flex="3" p="6">
          <Text typography="h2" mb={3} textAlign="center" color="light">
            Mock Passwordless
          </Text>
          <ButtonPrimary
            width="100%"
            mt={3}
            size="large"
            // do stuff, then onNext
            onClick={onNext}
          >
            Submit
          </ButtonPrimary>
          <ButtonPrimary
            width="200px"
            mt={5}
            size="medium"
            onClick={() => onSwitch('local', true /* transition back */)}
          >
            Go to OtherFlow
          </ButtonPrimary>
        </Box>
      </Flex>
    </Card>
  );
};

const FinalStep = ({ onSubmit, onSize }) => {
  const ref = useRef();

  return (
    <Card as="form" bg="primary.light" my={6} mx="auto" width={464} ref={ref}>
      <Flex>
        <Box flex="3" p="6">
          <Text typography="h2" mb={3} textAlign="center" color="light">
            FINAL STEP! Your done!
          </Text>
          <Box p={5}>this is step final</Box>
          <Box p={5}>this is step final</Box>
          <ButtonPrimary width="100%" mt={3} size="large" onClick={onSubmit}>
            Go to dashboard
          </ButtonPrimary>
        </Box>
      </Flex>
    </Card>
  );
};

const steps = {
  local: [MainStep1, MainStep2, FinalStep],
  pwdless: [OtherStep1, FinalStep],
};
