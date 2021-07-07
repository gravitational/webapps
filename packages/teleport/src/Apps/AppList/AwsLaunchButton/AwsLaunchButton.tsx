import React from 'react';
import styled from 'styled-components';
import { ButtonBorder, Text } from 'design';
import { Cell } from 'design/DataTable';
import Menu, { MenuItem } from 'design/Menu';
import { CarrotDown } from 'design/Icon';
import cfg from 'teleport/config';
import { AwsRole } from 'teleport/services/apps';

export default class AwsLaunchButton extends React.Component<
  AwsLaunchButtonProps
> {
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
    const { open } = this.state;
    const { awsRoles, fqdn, clusterId, publicAddr } = this.props;
    return (
      <Cell align="right">
        <ButtonBorder
          width="88px"
          size="small"
          setRef={e => (this.anchorEl = e)}
          onClick={this.onOpen}
        >
          LAUNCH
          <CarrotDown ml={1} fontSize={2} color="text.secondary" />
        </ButtonBorder>
        <Menu
          menuListCss={() => ({
            maxHeight: '240px',
            overflowY: 'scroll',
          })}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
          anchorEl={this.anchorEl}
          open={open}
          onClose={this.onClose}
        >
          <RoleItemList
            awsRoles={awsRoles}
            fqdn={fqdn}
            clusterId={clusterId}
            publicAddr={publicAddr}
          />
        </Menu>
      </Cell>
    );
  }
}

function RoleItemList({
  awsRoles,
  fqdn,
  clusterId,
  publicAddr,
}: AwsLaunchButtonProps) {
  const awsRoleItems = awsRoles.map((item, key) => {
    const { display, arn } = item;
    const launchUrl = cfg.getAppLauncherRoute({
      fqdn,
      clusterId,
      publicAddr,
      arn,
    });
    return (
      <StyledMenuItem
        key={key}
        px={2}
        mx={2}
        as="a"
        href={launchUrl}
        target="_blank"
        title={display}
      >
        <Text style={{ maxWidth: '25ch' }}>{display}</Text>
      </StyledMenuItem>
    );
  });

  return (
    <>
      <Text color="text.onLight" px={2} m={2} mb={1}>
        Select IAM Role
      </Text>
      {awsRoleItems}
    </>
  );
}

type AwsLaunchButtonProps = {
  awsRoles: AwsRole[];
  fqdn: string;
  clusterId: string;
  publicAddr: string;
};

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  color: ${theme.colors.grey[400]};
  font-size: 12px;
  border-bottom: 1px solid ${theme.colors.subtle};
  min-height: 32px;
  margin-right: 0px;
  &:hover {
    color: ${theme.colors.link};
  }

  :last-child {
    border-bottom: none;
    margin-bottom: 8px;
  }
`
);
