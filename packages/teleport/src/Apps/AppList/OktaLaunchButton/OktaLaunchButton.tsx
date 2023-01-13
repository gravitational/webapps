import React from 'react';
import styled from 'styled-components';
import { ButtonBorder, Text } from 'design';
import Menu, { MenuItem } from 'design/Menu';
import { CarrotDown } from 'design/Icon';

import cfg from 'teleport/config';
import { OktaRole } from 'teleport/services/apps';

export default class OktaLaunchButton extends React.Component<Props> {
  anchorEl = React.createRef();

  state = {
    open: false,
    anchorEl: null,
  };

  onOpen = () => {
    this.setState({ open: true });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { publicAddr } = this.props;
    const launchUrl = cfg.getOktaLauncherRoute({
      publicAddr,
    });
    return (
      <>
        <ButtonBorder
          as="a"
          width="88px"
          size="small"
          target="_blank"
          href={launchUrl}
          rel="noreferrer"
        >
          LAUNCH
        </ButtonBorder>
      </>
    );
  }
}

type Props = {
  publicAddr: string;
};