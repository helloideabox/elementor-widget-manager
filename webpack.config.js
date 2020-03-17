const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

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

	// Setting rules for modules.
	module: {
		// Setting mode for webpack.
		mode: 'development',
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(css|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
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
	plugin: [
		new MiniCssExtractPlugin( {
			filename: 'admin.css'
		} )
	]

}

module.exports = config;
