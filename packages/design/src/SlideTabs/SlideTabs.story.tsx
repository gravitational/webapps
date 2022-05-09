import React from 'react';
import SlideTabs from './SlideTabs';

export default {
  title: 'Design/SlideTabs',
};

export const ThreeTabs = () => {
  return <SlideTabs tabs={['aws', 'automatically', 'manually']} />;
};

export const FiveTabs = () => {
  return <SlideTabs tabs={['step1', 'step2', 'step3', 'step4', 'step5']} />;
};
