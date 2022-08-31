/*
Copyright 2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { render, fireEvent, screen } from 'design/utils/testing';

import { Banner } from './Banner';

describe('components/BannerList/Banner', () => {
  it('displays the supplied message', () => {
    const msg = 'I am a banner';
    render(
      <Banner message={msg} severity={0} id="test-banner" onClose={() => {}} />
    );
    expect(screen.getByText(msg)).toBeInTheDocument();
  });

  function assertComputedStyle(
    win,
    doc,
    Component,
    props,
    styleName,
    styleValue
  ) {
    const componentClass = Component(props).type.styledComponentId;
    const componentElement = doc.getElementsByClassName(componentClass);
    const style = win.getComputedStyle(componentElement[0]);
    expect(style[styleName]).toBe(styleValue);
  }

  it('renders an info banner for under severity 5', async () => {
    await Promise.all(
      [0, 1, 2, 3, 4].map(severity => {
        const bannerProps = {
          message: 'I am steve banner',
          severity,
          id: 'test-banner',
          onClose: () => {},
        };

        const { unmount } = render(<Banner {...bannerProps} />);
        expect(screen.getByRole('icon')).toHaveClass('icon-info_outline');

        assertComputedStyle(
          window,
          document,
          Banner,
          bannerProps,
          'backgroundColor',
          'rgb(3, 155, 229)'
        );

        unmount();
      })
    );
  });

  it('renders a warning banner for severity 5 to 9', async () => {
    await Promise.all(
      [5, 6, 7, 8, 9].map(severity => {
        const bannerProps = {
          message: 'I am a banner',
          severity,
          id: 'test-banner',
          onClose: () => {},
        };

        const { unmount } = render(<Banner {...bannerProps} />);
        expect(screen.getByRole('icon')).toHaveClass('icon-info_outline');

        assertComputedStyle(
          window,
          document,
          Banner,
          bannerProps,
          'backgroundColor',
          'rgb(255, 145, 0)'
        );

        unmount();
      })
    );
  });

  it('renders an alert banner for severity 10 and above', async () => {
    await Promise.all(
      [10, 11, 12, 56, 942].map(severity => {
        const bannerProps = {
          message: 'I am a banner',
          severity,
          id: 'test-banner',
          onClose: () => {},
        };

        const { unmount } = render(<Banner {...bannerProps} />);
        expect(screen.getByRole('icon')).toHaveClass('icon-warning');

        assertComputedStyle(
          window,
          document,
          Banner,
          bannerProps,
          'backgroundColor',
          'rgb(245, 0, 87)'
        );

        unmount();
      })
    );
  });

  it('calls onClose when the X is clicked', () => {
    const bannerProps = {
      message: 'I am a banner',
      severity: 1,
      id: 'test-banner',
      onClose: jest.fn(),
    };

    render(<Banner {...bannerProps} />);

    fireEvent.click(screen.getByRole('button'));
    expect(bannerProps.onClose).toHaveBeenCalledTimes(1);
    expect(bannerProps.onClose).toHaveBeenCalledWith(bannerProps.id);
  });
});
