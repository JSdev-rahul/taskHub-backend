const path = require("path")

module.exports = {
  mode: "development",
  target: "node",
  entry: "./index.js", // Entry point of your application
  output: {
    filename: "bundle.js", // Output file name
    path: path.resolve(__dirname, "dev-build"), // Output directory
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader",
        // use: {
        //   loader: "babel-loader", // Use Babel loader for transpiling
        // },
      },
    ],
  },
}
