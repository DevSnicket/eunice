/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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