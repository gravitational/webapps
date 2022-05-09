import React from 'react';
import Pill from './Pill';

export default {
  title: 'Design/Pill',
};

export const PillOptions = () => {
  return (
    <>
      <Pill label="arch: x86_64" />
      <br />
      <br />
      <Pill label="hostname: ip-172-31-9-155.us-west-2.compute.internal" />
      <br />
      <br />
      <Pill label="arch: x86_64" dismissable />
      <br />
      <br />
      <Pill
        label="hostname: ip-172-31-9-155.us-west-2.compute.internal"
        dismissable
      />
    </>
  );
};
