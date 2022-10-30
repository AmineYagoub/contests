const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    optimization: {
      minimize: false,
      moduleIds: 'named',
      chunkIds: 'named',
    },
  });
};
