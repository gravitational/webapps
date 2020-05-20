/*
Copyright 2019 Gravitational, Inc.

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
import styled from 'styled-components';
import Popover from 'design/Popover';
import theme from 'design/theme';
import { debounce } from 'lodash';

export default function JoinedUsers({active, users, open = false, ml, mr }) {
  const ref = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(open);

  const handleOpen = React.useMemo(() => {
    return debounce(() => setIsOpen(true), 300);
  }, []);

  function onMouseEnter() {
    handleOpen.cancel();
    handleOpen();
  }

  function handleClose() {
    handleOpen.cancel();
    setIsOpen(false);
  }

  if (users.length < 2) {
    return null;
  }

  const $users = users.map((u, index) => {
    const initial = u.user.trim().charAt(0).toUpperCase(); 

    return (
      <li key={`${index}${u.user}`}>
        <StyledAvatar>{initial}</StyledAvatar>
        {u.user}
      </li>
    )
    
    });

  return (
    <StyledUsers
      active={active}
      ml={ml}
      mr={mr}
      ref={ref}
      onMouseLeave={handleClose}
      onMouseEnter={onMouseEnter}

    >
      {users.length}
      <Popover
        open={isOpen}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <StyledDropdown
          bg="white"
          color="black"
          px={4}
          py={2}
          minWidth="200px"
          onMouseLeave={handleClose}
        >
          {$users}
        </StyledDropdown>
      </Popover>
    </StyledUsers>
  );
}

const StyledUsers = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  font-size: 11px;
  font-weight: bold; 
  overflow: hidden;
  position: relative;
  align-items: center;
  flex-shrink: 0;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  background-color: ${props => props.active ? theme.colors.accent : theme.colors.grey[900] };
`;

const StyledAvatar = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.light};
  border-radius: 50%;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  justify-content: center;
  height: 32px; 
  margin-right: 16px; 
  width: 32px; 
`

const StyledDropdown = styled.ul`
  background: #FFF; 
  border-radius: 8px; 
  list-style-type: none;
  margin: 0; 
  padding: 0;

  li {
    border-bottom: 1px solid ${theme.colors.grey[50]};
    color: ${theme.colors.grey[600]};
    font-size: 12px; 
    display: flex; 
    line-height: 24px; 
    margin: 0; 
    padding: 16px !important; 

    &:last-child {
      border: none;
    }
  }
`; 