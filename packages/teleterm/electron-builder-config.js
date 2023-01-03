const { env, platform } = require('process');

const isMac = platform === 'darwin';

// The following checks make no sense when cross-building because they check the platform of the
// host and not the platform we're building for.
//
// However, at the moment we don't cross-build Connect and these checks protect us from undesired
// behavior.
//
// Also, we just want to make sure that those are explicitly set but they can be empty. That's why
// we check for undefined only and not for falsy values.
//
// Setting one of the env vars to an empty string is useful in environments where we don't intend to
// build a fully-fledged Connect version but rather want to just check that the packaging step is
// working, for example in CI.
if (
  isMac &&
  (env.CONNECT_TSH_APP_PATH === undefined) ===
    (env.CONNECT_TSH_BIN_PATH === undefined)
) {
  throw new Error(
    'You must provide CONNECT_TSH_APP_PATH xor CONNECT_TSH_BIN_PATH'
  );
}

if (!isMac && env.CONNECT_TSH_BIN_PATH === undefined) {
  throw new Error('You must provide CONNECT_TSH_BIN_PATH');
}

/**
 * @type { import('electron-builder').Configuration }
 */
module.exports = {
  appId: 'gravitational.teleport.connect',
  asar: true,
  asarUnpack: '**\\*.{node,dll}',
  afterSign: 'notarize.js',
  files: ['build/app/dist'],
  mac: {
    target: 'dmg',
    category: 'public.app-category.developer-tools',
    type: 'distribution',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    // If CONNECT_TSH_APP_PATH is provided, we assume that tsh.app is already signed.
    signIgnore: env.CONNECT_TSH_APP_PATH && ['tsh.app'],
    icon: 'build_resources/icon-mac.png',
    // On macOS, helper apps (such as tsh.app) should be under Contents/MacOS, hence using
    // `extraFiles` instead of `extraResources`.
    // https://developer.apple.com/documentation/bundleresources/placing_content_in_a_bundle
    // https://developer.apple.com/forums/thread/128166
    extraFiles: [
      // CONNECT_TSH_APP_PATH is for environments where we want to copy over the whole signed
      // version of tsh.app for Touch ID support.
      env.CONNECT_TSH_APP_PATH && {
        from: env.CONNECT_TSH_APP_PATH,
        to: './MacOS/tsh.app',
      },
      // CONNECT_TSH_BIN_PATH is for environments where we just need a regular tsh binary. We still
      // copy it to the same location that it would be at in a real tsh.app to avoid conditional
      // logic elsewhere.
      env.CONNECT_TSH_BIN_PATH && {
        from: env.CONNECT_TSH_BIN_PATH,
        to: './MacOS/tsh.app/Contents/MacOS/tsh',
      },
    ].filter(Boolean),
  },
  dmg: {
    contents: [
      {
        x: 130,
        y: 220,
      },
      {
        x: 410,
        y: 220,
        type: 'link',
        path: '/Applications',
      },
    ],
  },
  win: {
    target: ['nsis'],
    artifactName: '${productName} Setup-${version}.${ext}',
    icon: 'build_resources/icon-win.ico',
    extraResources: [
      env.CONNECT_TSH_BIN_PATH && {
        from: env.CONNECT_TSH_BIN_PATH,
        to: './bin/tsh.exe',
      },
    ].filter(Boolean),
  },
  rpm: {
    artifactName: '${name}-${version}.${arch}.${ext}',
    afterInstall: 'build_resources/linux/after-install.tpl',
    afterRemove: 'build_resources/linux/after-remove.tpl',
    // --rpm-rpmbuild-define "_build_id_links none" fixes the problem with not being able to install
    // Connect's rpm next to other Electron apps.
    // https://github.com/gravitational/teleport/issues/18859
    fpm: ['--rpm-rpmbuild-define', '_build_id_links none'],
  },
  deb: {
    artifactName: '${name}_${version}_${arch}.${ext}',
    afterInstall: 'build_resources/linux/after-install.tpl',
    afterRemove: 'build_resources/linux/after-remove.tpl',
  },
  linux: {
    target: ['tar.gz', 'rpm', 'deb'],
    artifactName: '${name}-${version}-${arch}.${ext}', // tar.gz
    category: 'Development',
    icon: 'build_resources/icon-linux',
    extraResources: [
      env.CONNECT_TSH_BIN_PATH && {
        from: env.CONNECT_TSH_BIN_PATH,
        to: './bin/tsh',
      },
    ].filter(Boolean),
  },
  directories: {
    buildResources: 'build_resources',
    output: 'build/release',
  },
};
