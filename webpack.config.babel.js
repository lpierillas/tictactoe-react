import path from 'path';

const config = {
    entry: path.resolve(__dirname, './src/main/index.js'),

    output: {
        path: path.resolve(__dirname, './dist/assets'),
        filename: 'index.js',
        publicPath: '/assets'
    },

    devServer: {
        inline: true,
        port: 8081,
        contentBase: path.resolve(__dirname, './public')
    },

    devtool: 'cheap-module-inline-source-map',

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['babel-plugin-transform-object-rest-spread', 'relay'],
                    },
                }],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    }
};

export default config;