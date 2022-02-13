/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { createOrAddToStacksUsingFileSystem } from "../../../../../stacking-explicit";
import createSubsetIdentifierHierarchy from "./createSubsetIdentifierHierarchy";
import inferStacks from "./inferStacks";
import modifyStacksWithFile from "./modifyStacksWithFile";
import removeEmptySelfDependentOfType from "./removeEmptySelfDependentOfType";
import removePackagePrefixAndScopeInDependsUpon from "./removePackagePrefixAndScopeInDependsUpon";
import setDependencyPermeable from "./setDependencyPermeable";
import setIdentifierOfAnonymousExportToParent from "./setIdentifierOfAnonymousExportToParent";
import unstackIndependent from "./unstackIndependent";

export default ({
	dependencyPermeableIdentifiers,
	directoryToCreateOrAddToStacksFrom,
	isInferStacksEnabled,
	modifyStacksFile,
	packagePrefixAndScope,
	rootItemIdentifier,
}) =>
	[
		identifierOrItemOrLevelOrStack =>
			modifyStacksWithFile({
				...modifyStacksFile,
				identifierOrItemOrLevelOrStack,
			}),
		identifierOrItemOrLevelOrStack =>
			createOrAddToStacksUsingFileSystem({
				directory:
					directoryToCreateOrAddToStacksFrom,
				identifierOrItemOrLevelOrStack,
				subsetIdentifierHierarchy:
					createSubsetIdentifierHierarchy({
						identifierOrItemOrLevelOrStack,
						rootItemIdentifier,
					}),
			}),
		setIdentifierOfAnonymousExportToParent,
		identifierOrItemOrLevelOrStack =>
			removeEmptySelfDependentOfType({
				identifierOrItemOrLevelOrStack,
				types: [ "export", "import", "variable" ],
			}),
		unstackIndependent,
		identifierOrItemOrLevelOrStack =>
			removePackagePrefixAndScopeInDependsUpon({
				identifierOrItemOrLevelOrStack,
				...packagePrefixAndScope,
			}),
		identifierOrItemOrLevelOrStack =>
			setDependencyPermeable({
				dependencyPermeableIdentifiers,
				identifierOrItemOrLevelOrStack,
			}),
		identifierOrItemOrLevelOrStack =>
			(isInferStacksEnabled && inferStacks(identifierOrItemOrLevelOrStack))
			||
			identifierOrItemOrLevelOrStack,
	];