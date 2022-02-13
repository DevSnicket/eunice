/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import calculateSize from "./calculateSize";
import createMultipleItemInnerDependencyGroupFactory from "./createMultipleItemInnerDependencyGroupFactory";
import createParentGroup from "./createParentGroup";
import getIdentifierClassNameAndText from "../../getIdentifierClassNameAndText";
import withPrecision from "../../withPrecision";

export default ({
	createElement,
	createTextGroup,
	dependencyGroupFactories,
	getTextWidth,
	parent,
	stackGroupFactory,
}) =>
	dependencyGroupFactories.createOuterFromItem({
		contentGroupFactory:
			createParentGroupFactoryWithSize({
				createElement,
				createTextGroup,
				getTextWidth,
				identifier:
					{
						height:
							40,
						...getIdentifierClassNameAndText(
							parent.id,
						),
					},
				innerDependencyGroupFactory:
					createMultipleItemInnerDependencyGroupFactory({
						createInnerDependencyGroupFactoryFromItem:
							dependencyGroupFactories.createInnerFromItem,
						parent,
					}),
				stackGroupFactory,
			}),
		item:
			parent,
	});

function createParentGroupFactoryWithSize({
	createElement,
	createTextGroup,
	getTextWidth,
	identifier,
	innerDependencyGroupFactory,
	stackGroupFactory,
}) {
	const { height, width } =
		calculateSize({
			getTextWidth,
			identifier,
			innerDependencyGroupFactory,
			stackGroupFactory,
		});

	return {
		createAtPosition:
			({ top, left }) =>
				createParentGroup({
					createElement,
					createTextGroup,
					height,
					identifier,
					innerDependencyGroupFactory,
					left:
						withPrecision(left),
					stackGroupFactory,
					top,
					width,
				}),
		height,
		width,
	};
}