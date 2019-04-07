const
	CopyPlugin = require("copy-webpack-plugin"),
	path = require("path");

module.exports =
	cssFiles => {
		const baseCssFiles =
			[
				"react-reflex.css",
				"harness.css",
			];

		return (
			[
				new CopyPlugin(
					[
						{
							from: getFilePathFromName("harness.html"),
							transform: transformHtml,
						},
					],
				),
				new CopyPlugin(
					[
						...baseCssFiles.map(getFilePathFromName),
						...cssFiles,
					],
				),
			]
		);

		function transformHtml(
			content,
		) {
			return (
				content
				.toString()
				.replace(
					/<\/head>/,
					`${getLinkElementsForCssFiles()}$&`,
				)
			);
		}

		function getLinkElementsForCssFiles() {
			return (
				[
					...baseCssFiles,
					...cssFiles.map(cssFile => path.basename(cssFile)),
				]
				.map(cssFile => `<link rel="stylesheet" href="${cssFile}">`)
				.join("")
			);
		}
	};

function getFilePathFromName(
	filename,
) {
	return path.join(__dirname, "..", filename);
}