module.exports = (config, context) => {
  const { module } = config;

  module.rules.push(
    {
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
        },
        {
          loader: require.resolve("react-svg-loader"),
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: ["file-loader"],
    },
  );

  return { ...config, module };
};
