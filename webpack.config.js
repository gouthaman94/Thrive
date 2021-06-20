module.exports = (config, context) => {
  const { module } = config;

  module.rules.push(
    {
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: ["file-loader"],
    },
  );

  return { ...config, module };
};
