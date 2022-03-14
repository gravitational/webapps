import React, { useRef, useState } from 'react';
import Popover from 'design/Popover';
import { useIdentity } from './useIdentity';
import { IdentityList } from './IdentityList/IdentityList';
import { IdentitySelector } from './IdentitySelector/IdentitySelector';

export function Identity() {
  const selectorRef = useRef<HTMLButtonElement>();
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const {
    activeRootCluster,
    rootClusters,
    changeContext,
    logout,
    removeCluster,
    addCluster,
  } = useIdentity();

  const loggedInUser = activeRootCluster?.loggedInUser;
  return (
    <>
      <IdentitySelector
        ref={selectorRef}
        onClick={() => setIsPopoverOpened(wasOpened => !wasOpened)}
        isOpened={isPopoverOpened}
        userName={loggedInUser?.name}
        hostName={activeRootCluster?.name}
      />
      <Popover
        open={isPopoverOpened}
        anchorEl={selectorRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setIsPopoverOpened(false)}
      >
        <IdentityList
          loggedInUser={loggedInUser}
          clusters={rootClusters}
          selectCluster={changeContext}
          logout={logout}
          removeCluster={removeCluster}
          addCluster={addCluster}
        />
      </Popover>
    </>
  );
}
