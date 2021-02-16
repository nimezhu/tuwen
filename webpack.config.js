module.exports = {
    entry: "./index.js",
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: './lib.js',
        libraryTarget: 'umd',
        library: 'reflexiv',
    },
    plugins: [],
    node: {
        //fs: 'empty'
    }
}
