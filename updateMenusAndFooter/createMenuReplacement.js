export default ({
	directoryPath,
	rootPath,
}) => ({
	content:
		formatMenuHtml({
			directoryPath,
			rootPath,
		}),
	tag:
		"menu",
});

function formatMenuHtml({
	directoryPath,
	rootPath,
}) {
	return (
		[
			formatRoot(),
			...formatDirectories(),
		]
		.join("")
	);

	function formatRoot() {
		return (
			formatMenuItemHtml({
				directories:
					[ "." ],
				href:
					rootPath.slice(0, -1),
				title:
					"intro",
			})
		);
	}

	function formatDirectories() {
		return (
			[
				{
					directory: "how-it-works",
					redirectDirectories: [ "advanced", "dependencies", "structure" ],
				},
				{ directory: "case-studies" },
				{
					directory: "languages",
					redirectDirectories: [ "csharp", "dotnet", "javascript" ],
				},
				{ directory: "issues" },
				{ directory: "blog" },
			]
			.map(formatDirectory)
		);

		function formatDirectory({
			directory,
			redirectDirectories = [],
			title = directory.replace(/-/g, " "),
		}) {
			return (
				formatMenuItemHtml({
					directories:
						[ directory, ...redirectDirectories ],
					href:
						`${rootPath}${directory}`,
					title,
				})
			);
		}
	}

	function formatMenuItemHtml({
		directories,
		href,
		title,
	}) {
		return `<a ${formatClassAttribute()}href="${href}">${title}</a>`;

		function formatClassAttribute() {
			return whenCurrent() || "";

			function whenCurrent() {
				return (
					isCurrent()
					&&
					`class="current" `
				);

				function isCurrent() {
					return (
						directories.some(
							directory => directoryPath.startsWith(directory)
						)
					);
				}
			}
		}
	}
}