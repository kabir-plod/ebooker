var webpackConfig = require('./wtest.webpack.config.js');

// karma.conf.ts
module.exports = function(config) {
	config.set(
	{
		basePath: './tests',

		frameworks: ['tap'],

		files: ['**/*-test.ts'],
		mime: {
			'text/x-typescript': ['ts','tsx']
		},

		preprocessors: {
			'**/*.ts': ['webpack']
		},
		webpack: webpackConfig,

		browsers: ['Chrome_without_security'],
		customLaunchers: {
			Chrome_without_security: {
				base: 'Chrome',
				flags: ['--disable-web-security']
			}
		},

		reporters: ['tap-pretty'],
		tapReporter: {
			prettify: require('tap-diff'),
			separator: '****************************'
		},

		singleRun: false,
		port: 9876,
		colors: true
	});
}