var path = require('path');
var webpack = require('webpack');


var entryObj = {
	'test-script': path.join(__dirname, '/test/main-test.ts')
};
var manifestFile = '/test/manifest.json';
var outdir = '/dist/test';
var moduleRulesInclude = [path.join(__dirname, 'src'), path.join(__dirname, 'test')];
var devtool = 'cheap-source-map';

module.exports = {
	devtool: devtool,
	entry: entryObj,
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
	// Workaround for `can't resolve module 'fs'` issue
	node: {
		fs: 'empty',
		module: false
	}
};
