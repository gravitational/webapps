import React from 'react';
import { Box, Text, Flex, Indicator, ButtonPrimary } from 'design';
import { Danger } from 'design/Alert';
import useTeleport from 'teleport/useTeleport';
import MfaDeviceList, { RemoveDialog } from 'teleport/components/MfaDeviceList';
import AddDevice from './AddDevice';
import ReAuthenticate from 'teleport/components/ReAuthenticate';
import useManageDevices, { State } from './useManageDevices';

export default function Container() {
  const ctx = useTeleport();
  const state = useManageDevices(ctx);
  return <ManageDevices {...state} />;
}

export function ManageDevices({
  token,
  setToken,
  onAddDevice,
  createRestrictedTokenAttempt,
  devices,
  fetchDevices,
  fetchDevicesAttempt,
  setDeviceToRemove,
  removeDevice,
  deviceToRemove,
  isDialogVisible,
  showDialog,
  hideDialog,
}: State) {
  const showReAuthenticate = !token;
  const showRemoveDevice = token && deviceToRemove;
  const showAddDevice = token && !deviceToRemove;

  return (
    <>
      <Box width="900px">
        {fetchDevicesAttempt.status === 'processing' && (
          <Box textAlign="center">
            <Indicator />
          </Box>
        )}
        {createRestrictedTokenAttempt.status === 'failed' && (
          <Danger mb={3}>{createRestrictedTokenAttempt.statusText}</Danger>
        )}
        {fetchDevicesAttempt.status === 'failed' && (
          <Danger mb={3}>{fetchDevicesAttempt.statusText}</Danger>
        )}
        {fetchDevicesAttempt.status === 'success' && (
          <>
            <Flex
              px={5}
              py={4}
              bg="primary.light"
              borderTopRightRadius={3}
              borderTopLeftRadius={3}
              justifyContent="space-between"
            >
              <Text typography="h4" bold>
                Two-Factor Devices
              </Text>
              <ButtonPrimary
                onClick={onAddDevice}
                disabled={createRestrictedTokenAttempt.status === 'processing'}
              >
                Add two-factor device
              </ButtonPrimary>
            </Flex>
            <MfaDeviceList
              devices={devices}
              remove={device => {
                setDeviceToRemove(device);
                showDialog();
              }}
              style={{
                borderTopRightRadius: '0px',
                borderTopLeftRadius: '0px',
              }}
            />
          </>
        )}
      </Box>
      {isDialogVisible && (
        <>
          {showReAuthenticate && (
            <ReAuthenticate setToken={setToken} close={hideDialog} />
          )}
          {showRemoveDevice && (
            <RemoveDialog
              name={deviceToRemove.name}
              onRemove={removeDevice}
              onCancel={hideDialog}
            />
          )}
          {showAddDevice && (
            <AddDevice
              fetchDevices={fetchDevices}
              token={token}
              close={hideDialog}
            />
          )}
        </>
      )}
    </>
  );
}
