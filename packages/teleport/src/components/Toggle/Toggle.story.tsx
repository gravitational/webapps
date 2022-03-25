import React, { useState } from 'react';
import Toggle from './Toggle';

export default {
  title: 'Teleport/Toggle',
};

export function Test() {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <>
      <p>This is {isToggled ? 'activated' : 'deactivated'}</p>
      <Toggle isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
    </>
  );
}
