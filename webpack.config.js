const path = require("path");

let defaultConfig;
try {
  defaultConfig = require("@wordpress/scripts/config/webpack.config");
} catch (error) {
  console.error("Error loading @wordpress/scripts config:", error.message);
  defaultConfig = {};
}

const adminConfig = {
  ...defaultConfig,
  mode: "development", // Add mode for development
  entry: {
    dashboard: "./admin/views-react/dashboard.jsx", // Entry point for dashboard
    file: "./admin/views-react/file-optimization.jsx",
    image: "./admin/views-react/image-optimization.jsx",
    database: "./admin/views-react/database-optimization.jsx",
  },
  output: {
    path: path.resolve(__dirname, "admin/views"),
    filename: "[name].js", // Output naming convention
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Matches JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // JSX and ESNext support
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve JS and JSX extensions
  },
};

module.exports = [adminConfig];
