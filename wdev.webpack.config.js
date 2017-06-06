var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var entryObj = {
	'content-script': path.join(__dirname, '/src/content-script.ts')
};
var manifestFile = '/src/manifest.json';
var backgroundPage = '/src/bg.js';
var outdir = '/dist/main';
var moduleRulesInclude = [path.join(__dirname, 'src')];
var devtool = 'cheap-source-map';


var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	// Copy manifest
	{
		from: path.join(__dirname, manifestFile),
		to: path.join(__dirname, outdir),
	},
	// Copy background page
	{
		from: path.join(__dirname, backgroundPage),
		to: path.join(__dirname, outdir),
	}
],
{});

module.exports = {
	devtool: devtool,
	entry: entryObj,
	output: {
		path: path.join(__dirname, outdir),
		filename: '[name].js',
		publicPath: '/static/'
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			loaders: ['awesome-typescript-loader'],
			include: moduleRulesInclude
		}]
	},
	plugins: [
		CopyWebpackPluginConfig,
	],
	// Workaround for `can't resolve module 'fs'` issue with htmltidy2
	node: {
		fs: 'empty',
		child_process: 'empty'
	}
};
