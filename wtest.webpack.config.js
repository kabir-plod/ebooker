var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var entryObj = {
	'test-script': path.join(__dirname, '/tests/main-test.ts')
};
var manifestFile = '/tests/manifest.json';
var backgroundPage = '/tests/bg.html';
var outdir = '/dist/test';
var moduleRulesInclude = [path.join(__dirname, 'src'), path.join(__dirname, 'test')];
var devtool = 'cheap-source-map';


var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	// Copy manifest
	{
		from: path.join(__dirname, manifestFile),
		to: path.join(__dirname, outdir),
	},
	// Copy background
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
	// Workaround for `can't resolve module 'fs'` issue
	node: {
		fs: 'empty'
	}
};
