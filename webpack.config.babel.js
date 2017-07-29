import path from 'path';

const config = {
    entry: path.resolve(__dirname, './src/main/index.js'),

    output: {
        path: path.resolve(__dirname, './dist/assets'),
        filename: 'index.js',
        publicPath: '/assets',
    },

    devServer: {
        inline: true,
        port: 8081,
        contentBase: path.resolve(__dirname, './public'),
        historyApiFallback: true,
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
                        presets: ['env', 'react', 'es2015'],
                        plugins: ['babel-plugin-transform-object-rest-spread', 'relay', 'transform-class-properties'],
                    },
                }],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            },
        ],
    },
};

export default config;
