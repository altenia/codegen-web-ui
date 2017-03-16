module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        rules: [
        {
           test: /\.tsx?$/,
           loader: 'awesome-typescript-loader',
           exclude: /node_modules/,
        },
        {
            enforce: 'pre',
           test: /\.js$/, 
           loader: "source-map-loader"
        }
        ]

    },
resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};