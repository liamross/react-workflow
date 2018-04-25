module.exports = {
    entry: './demo/script.js',
    output: {
        filename: './demo/build/_bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ["transform-object-rest-spread"]
                    }
                }
            }
        ]
    }
};