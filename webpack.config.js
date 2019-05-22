
var webpack = require("webpack");
var path = require("path");

const ENV = process.env.npm_lifecycle_event;

module.exports = {
    entry: ENV==='site' ? './site/src/main.js' : './src/main.js',

    output: ENV==='site' ? 
        { path: __dirname+'/site/dist/',filename:'scripts/[name].js' } :
        { path: __dirname+'/dist/',filename: 'scripts/react-3d-viewer.js',library: 'React3DViewer',libraryTarget: 'umd' },
    module: {
        rules: [
            {    
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    'presets': ['@babel/preset-env', 'stage-0','@babel/preset-react'],
                    "plugins": [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                    ]
                }   
            },
            {
                test: /\.(css|less)$/,
                use: [

                'style-loader',   
                'css-loader',
                {
                        loader: 'postcss-loader',
                        options: {
                        plugins: ()=>[require('autoprefixer')]
                        }},  
                'less-loader'
                ]
            }
    
             , {
                test: /\.(png|jpg|jpeg|gif|webp)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      publicPath:''
                     ,name :'img/[name].[ext]?[hash:6]'
        
                    }
                  }
                ]
            }
            ,{
                test: /\.(md|obj|mtl)$/,
                loader : 'raw-loader'
              }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(" react-3d-viewer v"+require('./package.json').version+"\r\n By https://github.com/dwqdaiwenqi \r\n Github: https://github.com/dwqdaiwenqi/react-3d-viewer\r\n MIT Licensed."),
    ]

}
