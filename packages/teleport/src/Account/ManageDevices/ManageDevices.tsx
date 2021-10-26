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
  onRemoveDevice,
  createRestrictedTokenAttempt,
  devices,
  fetchDevices,
  fetchDevicesAttempt,
  removeDevice,
  deviceToRemove,
  isAddDeviceVisible,
  isReAuthenticateVisible,
  isRemoveDeviceVisible,
  hideReAuthenticate,
  hideAddDevice,
  hideRemoveDevice,
  mfaDisabled,
}: State) {
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
                disabled={
                  createRestrictedTokenAttempt.status === 'processing' ||
                  mfaDisabled
                }
                title={
                  mfaDisabled ? 'Two-factor authentication is disabled' : ''
                }
              >
                Add two-factor device
              </ButtonPrimary>
            </Flex>
            <MfaDeviceList
              devices={devices}
              remove={onRemoveDevice}
              mfaDisabled={mfaDisabled}
              style={{
                borderTopRightRadius: '0px',
                borderTopLeftRadius: '0px',
              }}
            />
          </>
        )}
      </Box>
      {isReAuthenticateVisible && (
        <ReAuthenticate setToken={setToken} close={hideReAuthenticate} />
      )}
      {isAddDeviceVisible && (
        <AddDevice
          fetchDevices={fetchDevices}
          token={token}
          close={hideAddDevice}
        />
      )}
      {isRemoveDeviceVisible && (
        <RemoveDialog
          name={deviceToRemove.name}
          onRemove={removeDevice}
          onCancel={hideRemoveDevice}
        />
      )}
    </>
  );
}
