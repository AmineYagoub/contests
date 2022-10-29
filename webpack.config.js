module.exports = function (options) {
  return {
    ...options,
    optimization: {
      minimize: false,
      namedModules: true,
      namedChunks: true,
    },
  };
};
