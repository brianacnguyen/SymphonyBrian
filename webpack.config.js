var webpack = require("webpack");

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        './app/app.jsx'
    ],
    externals : {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        })
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Main: 'app/components/Main.jsx',
            Navigation: 'app/components/Navigation.jsx',
            Home: 'app/components/Home.jsx',
            Store: 'app/components/Store.jsx',
            ProductsList: 'app/components/ProductsList.jsx',
            Product: 'app/components/Product.jsx',
            CartModal: 'app/components/CartModal.jsx',
            CartModalItem: 'app/components/CartModalItem.jsx',
            ViewAsControl: 'app/components/ViewAsControl.jsx',
            SymphonyApi: 'app/api/SymphonyApi.jsx',
            helper: 'app/utils/helper.js',
            applicationStyles : 'app/styles/app.scss'
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"]
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    devtool: "cheap-module-eval-source-map"
};
