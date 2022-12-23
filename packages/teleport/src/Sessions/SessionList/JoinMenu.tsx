import React from 'react';

import { ButtonBorder, Text, Box, Menu, MenuItem } from 'design';
import { CarrotDown } from 'design/Icon';
import cfg from 'teleport/config';
import { ParticipantMode } from 'teleport/services/session';

export const JoinMenuButton = ({
  sid,
  clusterId,
  participantModes,
}: {
  sid: string;
  clusterId: string;
  participantModes: ParticipantMode[];
}) => {
  return (
    <JoinMenu>
      {participantModes.map(participantMode => (
        <MenuItem
          key={participantMode}
          as="a"
          href={cfg.getSshSessionRoute({ sid, clusterId }, participantMode)}
          style={{ textTransform: 'capitalize' }}
        >
          {participantMode}
        </MenuItem>
      ))}
    </JoinMenu>
  );
};

class JoinMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = () => {
    this.setState({ anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { children } = this.props;
    const { anchorEl } = this.state;
    return (
      <Box textAlign="center" width="80px">
        <ButtonBorder size="small" onClick={this.handleClickListItem}>
          Join
          <CarrotDown ml={1} fontSize={2} color="text.secondary" />
        </ButtonBorder>
        <Menu
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Text px="2" fontSize="11px" color="grey.400" bg="subtle">
            Join as...
          </Text>
          {children}
        </Menu>
      </Box>
    );
  }
}
