const path = require('path');
const { spawn } = require('child_process');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolvepath = require('@gravitational/build/webpack/resolvepath');
const createConfig = require('@gravitational/build/webpack/webpack.base');
const baseCfg = createConfig();

function onFirstBuildDonePlugin(env) {
  let isInitialBuild = true;
  return {
    apply: compiler => {
      compiler.hooks.done.tap('OnFirstBuildDonePlugin', compilation => {
        if (!isInitialBuild) {
          return;
        }
        isInitialBuild = false;

        spawn(
          'yarn',
          ['start-electron'],
          //      ['start-electron', '--inspect-brk=5858  --remote-debugging-port=9223'],
          {
            shell: true,
            env,
            stdio: 'inherit',
          }
        )
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      });
    },
  };
}

var cfg = {
  entry: {
    main: './src/main.ts',
    preload: './src/preload.ts',
  },

  output: {
    path: resolvepath('build/app/dist/main'),
    filename: '[name].js',
  },

  resolve: {
    ...baseCfg.resolve,
    alias: {
      ...baseCfg.resolve.alias,
      teleterm: path.join(__dirname, './src'),
    },
  },

  devtool: false,

  target: 'electron-main',

  optimization: {
    minimize: false,
  },

  module: {
    noParse: baseCfg.noParse,
    strictExportPresence: true,
    rules: [baseCfg.rules.jsx({ withHot: false })],
  },

  externals: {
    'node-pty': 'commonjs2 node-pty',
  },

  plugins: [new CleanWebpackPlugin()],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    process.env.BABEL_ENV = 'development';
    process.env.NODE_ENV = 'development';
    cfg.mode = 'development';
    cfg.devtool = 'source-map';
    cfg.plugins.push(onFirstBuildDonePlugin(process.env));
  }

  if (argv.mode === 'production') {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
    cfg.mode = 'production';
  }

  return cfg;
};
