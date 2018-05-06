const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry:'./index.js',
    output: {
        path:path.resolve('dist'),
        filename: 'bundle.js'
    },

    module:{
        rules:[
            {test: /\.js$/ , loader:'babel-loader', exclude: '/node_modules/'},
            {test:'/\.jsx$/' , loader:'babel-loader', exclude: '/node_modules/'}
        ]


    }

};