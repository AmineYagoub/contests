const { composePlugins, withNx } = require('@nrwl/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  config.optimization = {
    minimize: false,
    moduleIds: 'named',
    chunkIds: 'named',
  };
  return config;
});
