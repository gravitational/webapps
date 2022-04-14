import React, { createRef } from 'react';
import styled from 'styled-components';
import { Box } from 'design';
import { Info } from 'design/Icon';
import Popover from 'design/Popover';

export default class Tooltip extends React.Component {
  anchorEl = createRef();

  state = {
    open: false,
  };

  onOpen = () => {
    this.setState({ open: true });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <TooltipButton
          setRef={e => (this.anchorEl = e)}
          onClick={this.onOpen}
          style={{ cursor: 'pointer', fontSize: '20px' }}
        />
        {open && (
          <Popover
            id="tooltip"
            open={open}
            anchorEl={this.anchorEl}
            getContentAnchorEl={null}
            onClose={this.onClose}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            modalCss={() => 'margin-top: 8px'}
          >
            <PopoverContent p={4}>
              <Box>{this.props.children}</Box>
            </PopoverContent>
          </Popover>
        )}
      </>
    );
  }
}

const PopoverContent = styled(Box)`
  height: fit-content;
  width: fit-content;
  max-width: 504px;
  background: ${props => props.theme.colors.primary.lighter};
`;

const TooltipButton = ({ setRef, ...props }) => {
  return (
    <div ref={setRef} style={{ lineHeight: '0px' }}>
      <Info {...props} />
    </div>
  );
};
