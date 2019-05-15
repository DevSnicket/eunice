const workers =
	[
		{
			label: "editorWorkerService",
			pathWithoutExtension: "editor/editor.worker",
		},
		{
			label: "javascript",
			language: "javascript",
			pathWithoutExtension: "language/typescript/ts.worker",
		},
	];

const packageName = "monaco-editor";

module.exports =
	{
		createWebpackEntryForLanguages,
		ensureMonacoGlobalInitialized,
	};

function createWebpackEntryForLanguages(
	languages,
) {
	return (
		Object.assign(
			{},
			...createEntries(),
		)
	);

	function createEntries() {
		return (
			workers
			.filter(
				({ language }) =>
					!language
					||
					languages.includes(language),
			)
			.map(
				({ pathWithoutExtension }) => (
					{ [formatUrl(pathWithoutExtension)]: `${packageName}/esm/vs/${pathWithoutExtension}.js` }
				),
			)
		);
	}
}

function ensureMonacoGlobalInitialized() {
	if (!self.MonacoEnvironment)
		self.MonacoEnvironment = { getWorkerUrl };

	function getWorkerUrl(
		moduleId,
		label,
	) {
		const worker = findWorkerWithLabel(label);

		if (worker)
			return formatUrl(`${worker.pathWithoutExtension}.js`);
		else
			throw Error(`Monaco editor label of "${label}" is not supported.`);
	}

	function findWorkerWithLabel(
		label,
	) {
		return workers.find(worker => label === worker.label);
	}
}

function formatUrl(
	path,
) {
	return `${packageName}/${path}`;
}