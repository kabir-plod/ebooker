var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var entryFile = '/tests/main-test.ts';
var manifestFile = '/tests/manifest.json';
var outdir = '/dist/test';
var outFilename = 'buttonclick-event-script.js';
var moduleRulesInclude = [path.join(__dirname, 'src'), path.join(__dirname, 'test')];


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
		path.join(__dirname, entryFile)
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
			include: moduleRulesInclude
		}]
	},
	plugins: [
		CopyWebpackPluginConfig,
	],
	// Workaround for `can't resolve module 'fs'` issue
	node: {
		fs: 'empty'
	}
};
