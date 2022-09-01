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

import { BannerList } from './BannerList';

import type { BannerType } from './BannerList';

describe('components/BannerList/Banner', () => {
  let banners: BannerType[] = null;
  beforeEach(() => {
    banners = [
      {
        message: 'I am steve banner',
        severity: 'info',
        id: 'test-banner1',
      },
      {
        message: 'I am steve banter',
        severity: 'warning',
        id: 'test-banner2',
      },
    ];
  });

  it('renders all supplied banners', () => {
    render(<BannerList banners={banners} />);
    expect(screen.getByText(banners[0].message)).toBeInTheDocument();
    expect(screen.getByText(banners[1].message)).toBeInTheDocument();
  });

  it('hides banner when the banner close is clicked', () => {
    banners.pop();
    render(<BannerList banners={banners} />);
    expect(screen.getByText(banners[0].message)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(banners[0].message)).not.toBeInTheDocument();
  });

  it('merges new banners with the old banner list', async () => {
    const { rerender } = render(<BannerList banners={banners} />);
    const newBanners: BannerType[] = [
      ...banners,
      {
        message: 'I am eve banner',
        severity: 'danger',
        id: 'test-banner3',
      },
    ];
    rerender(<BannerList banners={newBanners} />);
    expect(screen.getByText(newBanners[2].message)).toBeInTheDocument();
  });

  it('maintains hidden banners when merging banner list', async () => {
    const { rerender } = render(<BannerList banners={banners} />);
    expect(screen.getByText(banners[0].message)).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.queryByText(banners[0].message)).not.toBeInTheDocument();

    const newBanners: BannerType[] = [
      ...banners,
      {
        message: 'I am eve banner',
        severity: 'danger',
        id: 'test-banner3',
      },
    ];
    rerender(<BannerList banners={newBanners} />);
    expect(screen.queryByText(newBanners[0].message)).not.toBeInTheDocument();
    expect(screen.getByText(newBanners[1].message)).toBeInTheDocument();
    expect(screen.getByText(newBanners[2].message)).toBeInTheDocument();
  });

  it('supports rendering children', () => {
    const message = 'That was easy';
    render(
      <BannerList banners={banners}>
        <button>{message}</button>
      </BannerList>
    );
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
