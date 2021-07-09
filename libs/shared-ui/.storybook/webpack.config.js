const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const rootWebpackConfig = require("../../../.storybook/webpack.config");
/**
 * Export a function. Accept the base config as the only param.
 *
 * @param {Parameters<typeof rootWebpackConfig>[0]} options
 */
module.exports = async ({ config, mode }) => {
  config = await rootWebpackConfig({ config, mode });

  const tsPaths = new TsconfigPathsPlugin({
    configFile: "./tsconfig.base.json",
  });

  config.resolve.plugins
    ? config.resolve.plugins.push(tsPaths)
    : (config.resolve.plugins = [tsPaths]);

  // Found this here: https://github.com/nrwl/nx/issues/2859
  // And copied the part of the solution that made it work

  const svgRuleIndex = config.module.rules.findIndex((rule) => {
    const { test } = rule;

    return test.toString().startsWith("/\\.(svg|ico");
  });
  config.module.rules[
    svgRuleIndex
  ].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;

  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
        {
          loader: "sass-loader",
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif|webp)$/,
      loader: require.resolve("url-loader"),
      options: {
        limit: 10000, // 10kB
        name: "[name].[hash:7].[ext]",
      },
    },
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
  );

  return config;
};
