
var webpack = require("webpack")

module.exports = {
	entry: "./src/client-apis.js",
	output: {
		filename: "client-apis.js",
		libraryTarget: "umd"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				query: {
					presets: ["es2015"]
				}
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin({banner: "var me = this;", raw: true})
	]
}