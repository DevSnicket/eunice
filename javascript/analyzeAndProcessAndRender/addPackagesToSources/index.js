// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import path from "path";

export default ({
	packages,
	sources,
}) => {
	return whenHasPackageNames() || sources;

	function whenHasPackageNames() {
		return (
			packages
			&&
			packages.names
			&&
			[
				...createSources({
					basePath: getBasePath(packages),
					names: packages.names,
				}),
				...sources,
			]
		);
	}
};

function getBasePath({
	directory = "",
	scope,
	prefix = "",
}) {
	return (
		path.join(
			directory,
			"node_modules",
			formatScope(scope),
			prefix || path.sep,
		)
	);
}

function formatScope(
	scope,
) {
	return (
		(scope && `@${scope}`)
		||
		""
	);
}

function createSources({
	basePath,
	names,
}) {
	return (
		names.map(
			name => (
				{
					directory: `${basePath}${name}`,
					rootItemIdentifier: name,
				}
			),
		)
	);
}