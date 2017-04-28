var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var entryFile = '/src/index';
var manifestFile = '/src/manifest.json';
var outdir = '/dist/main';
var outFilename = 'content-script.js';


var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	// Copy manifest
	{
		from: path.join(__dirname, manifestFile),
		to: path.join(__dirname, outdir),
	}
],
{});

module.exports = {
	devtool: 'eval',
	entry: [
		entryFile
	],
	output: {
		path: path.join(__dirname, outdir),
		filename: outFilename,
		publicPath: '/static/'
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			loaders: ['awesome-typescript-loader'],
			include: path.join(__dirname, 'src')
		}]
	}
};
