import { AfterPackContext } from 'electron-builder';

import type { notarize as notarizeType } from '@electron/notarize';

const notarize = require(require.resolve('@electron/notarize', {
  paths: [''],
})) as typeof notarizeType;

export async function notarizeMacBuild(
  context: AfterPackContext
): Promise<void> {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  if (!process.env.APPLE_USERNAME || !process.env.APPLE_PASSWORD) {
    console.warn(
      'missing $APPLE_USERNAME and/or $APPLE_PASSWORD: notarization will be skipped'
    );
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appBundleId = context.packager.appInfo.macBundleIdentifier;

  return await notarize({
    appBundleId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_USERNAME,
    appleIdPassword: process.env.APPLE_PASSWORD,
    teamId: '',
    tool: 'notarytool',
  });
}
