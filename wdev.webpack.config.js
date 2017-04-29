var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var entryFile = '/src/index.tsx';
var manifestFile = '/src/manifest.json';
var outdir = '/dist/main';
var outFilename = 'content-script.js';
var moduleRulesInclude = [path.join(__dirname, 'src')];


var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	// Copy manifest
	{
		from: path.join(__dirname, manifestFile),
		to: path.join(__dirname, outdir),
	},
	// Copy background page
	{
		from: path.join(__dirname, '/src/bg.html'),
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
	]
};
