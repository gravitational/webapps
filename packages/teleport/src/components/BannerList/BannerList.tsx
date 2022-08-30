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

import React, { useEffect, useState } from 'react';

import { Box } from 'design';

import { Banner } from './Banner';

export const BannerList = ({ banners = [] }: Props) => {
  const [bannerList, setBannerList] = useState<{ [id: string]: BannerType }>(
    {}
  );

  useEffect(() => {
    const newList = {};
    banners.forEach(banner => (newList[banner.id] = banner));
    Object.assign(newList, bannerList);
    setBannerList(newList);
  }, [banners]);

  const removeBanner = id => {
    const newList = { ...bannerList };
    newList[id].hidden = true;
    setBannerList(newList);
  };

  return (
    <Box>
      {Object.entries(bannerList)
        .filter(banner => !banner[1].hidden)
        .map(banner => (
          <Banner
            message={banner[1].message}
            severity={banner[1].severity}
            id={banner[1].id}
            onClose={removeBanner}
            key={banner[1].id}
          />
        ))}
    </Box>
  );
};

type Props = {
  banners: BannerType[];
};

type BannerType = {
  message: string;
  severity: number;
  id: string;
  hidden?: boolean;
};
