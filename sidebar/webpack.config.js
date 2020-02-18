var path = require("path");

module.exports = {
  entry: "./js/index.tsx",
  mode: "production",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../assets")
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      // { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.css$/,
        include: /stylesheets|node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        include: /stylesheets/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/dist"
  }
};
