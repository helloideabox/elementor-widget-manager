const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpack = require( 'webpack' );

const config = {
	// Entry point.
	entry: {
		admin: ['./src/index.js'],
	},

	// Output single file.
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].js',
	},

	// Setting webpack dev server
	devServer: {
		contentBase: './build',
	},

	// Setting mode for webpack.
	mode: 'development',

	// Setting rules for modules.
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [require( 'autoprefixer' )],
						}
					},
					'sass-loader',
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: 'admin.css'
		} )
	]

}

module.exports = config;
