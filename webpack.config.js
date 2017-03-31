const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const compassIncludes = "includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib");

module.exports = {
	devtool: 'cheap-module-source-map',
	context: path.join(__dirname, 'src'),
	entry: {
        vendor: [
            "lodash/lodash.js",
            "jquery/dist/jquery.js",
            "createjs-easeljs/lib/easeljs-0.8.2.combined.js",
            "createjs-tweenjs/lib/tweenjs-0.6.0.combined.js"
        ],
		app:  './app.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},

	module: {
		////test processor
		//preLoaders: [
		//	{
		//		test: /\.js$/, // include .js files
		//		include: path.join(__dirname, 'src'),
		//		loader: "jshint-loader"
		//	}
		//],

        // problems with webpack
		//preLoaders: [
		//	// Javascript
		//	{
		//		test: /\.js$/,
		//		loader: 'eslint-loader',
		//		include: path.join(__dirname, 'src')
		//	}
		//],

		loaders: [
			// style processor
			//
			// sequence: (right to left)
			// 	1. (sass) tagets scss files will be converted to css,
			// 	2. (postcss) will apply prefix to make it compatible to most systems
			// 	3. (css) strips css into a file
			// 	4. (style) minify the css
			// 	Others. (compass mixins)
			{
				// test: /\.scss$/,
                test: /\.(css|scss)$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					loader: "css-loader!sass-loader?"+compassIncludes
				}),

				//loader: "style!css",
				//loader: "style!css!postcss!sass?" + compassIncludes,
				include: path.join(__dirname, 'src')
				// exclude: /node_modules/
			},

			// javascript processor
			// {
			// 	test: /\.js$/,
			// 	loader: 'babel-loader',
			// 	include: path.join(__dirname, 'src')
			// 	// exclude: /node_modules/
			// },

            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },

            // {
            //     test : /[\/\\]bower_components[\/\\]spectrum[\/\\]spectrum\.js$/,
            //     include : path.join(__dirname, 'bower_components','spectrum'),
            //     exclude: /node_modules/,
            //     //loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window',
            //     loader: 'imports-loader?this=>window',
            // }

		]
	},

	// problems with webpack
	//eslint: {
	//	failOnWarning: false,
	//	failOnError: true
	//},

	//// more options in the optional jshint object
	//jshint: {
	//	// any jshint option http://www.jshint.com/docs/options/
	//	// i. e.
	//	camelcase: true,
    //
	//	// jshint errors are displayed by default as warnings
	//	// set emitErrors to true to display them as errors
	//	emitErrors: false,
    //
	//	// jshint to not interrupt the compilation
	//	// if you want any file with jshint errors to fail
	//	// set failOnHint to true
	//	failOnHint: false,
    //
	//	//// custom reporter function
	//	//reporter: function(errors) { }
	//},

    resolve: {
	    extensions: ['.js'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'bower_components')
        ],

        // alias: {
        //     "backbone": "lib/backbone-1.1.0",
        //     "jquery": "lib/jquery-1.10.2",
        //     "underscore": "lib/lodash.underscore-2.3.0",
        //     "jqueryUI": "lib/jquery-ui.min"
        // }
        //
        // alias: {
        //     "jquery": "jquery/dist/jquery.js",
        //     "jquery.spectrum": "spectrum/spectrum.js"
        // }
	},

    //
    // plugins: [
    //     new webpack.ResolverPlugin(
    //         new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    //     )
    // ]

	devServer: {
		port: 9000,
		contentBase: path.join(__dirname, 'dist'),
		//inline: true, //inside package.json
		//hot: true,	//inside package.json
		open: true,
		compress: true,
		stats: {
			colors: true,
			reasons: true,
			chunks: false
		}
	},

	plugins: [
		new ExtractTextPlugin('[name].css'),

		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			hash: true,
			filename: 'index.html',
			chunks: ['app', 'vendor']
			// chunks: ['app']
		})
        // ,
        //
        // new webpack.ProvidePlugin({
        //     jQuery: 'jquery',
        //     jquery: 'jquery',
        //     $: 'jquery',
        //     _: 'lodash'
        // })
	]

	//watch: true
};