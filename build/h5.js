var fs = require('fs');
var path = require("path");
var webpack = require("webpack");
const babel = require("babel-core");
const distPath = "dist/h5/";
const fileName = "app.min.js";


webpack({
    entry: [
        'babel-polyfill',
        './src/main'
    ],
    output: {
        path: path.resolve(__dirname, "../dist/h5"),
        filename: "app.js"
    },
    module: {
        rules: [//https://webpack.js.org/loaders/babel-loader/
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ["env"]
                    }
                }
            }
        ]
    },
    mode: 'development',
    devtool: "source-map"
},
    (err, stats) => {
        if (err || stats.hasErrors()) {
            // Handle errors here
            console.warn(err);
        }
    }
);