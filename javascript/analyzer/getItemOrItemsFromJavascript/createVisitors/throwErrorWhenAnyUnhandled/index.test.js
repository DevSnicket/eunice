/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDeclarations from "../createDeclarations";
import createDependsUponIdentifiers from "../createDependsUponIdentifiers";
import { parse } from "@babel/parser";
import throwErrorWhenAnyUnhandled from "../throwErrorWhenAnyUnhandled";

test.each([ "id", "key" ])(
	"Unhandled declaration with parent identifier in \"%s\" throws error.",
	parentIdentifierPropertyName => {
		const
			identifier =
				"variable",
			parent =
				{
					end:
						2,
					[parentIdentifierPropertyName]:
						{ name: "parent" },
					start:
						1,
				};

		expect(
			() => {
				const
					declarations = createDeclarations();

				declarations.addDeclarationsIn({
					declarations: [ { id: identifier } ],
					parent,
				});

				throwErrorWhenAnyUnhandled({
					declarations:
						[ ...declarations.getGroupedByParent() ],
					dependsUponIdentifiers:
						[],
				});
			},
		)
		.toThrowError(`Unhandled declarations:\nExpression from character ${parent.start} to ${parent.end} with identifier "parent" contains unhandled identifiers of "${identifier}"`);
	},
);

test(
	"Unhandled dependency throws error.",
	() => {
		const identifier = "called";

		const javascript = `${identifier}();`;

		expect(
			() => {
				const
					dependsUponIdentifiers = createDependsUponIdentifiers(),
					parent = parse(javascript);

				dependsUponIdentifiers.addIdentifierToParent({
					identifier,
					parent,
				});

				throwErrorWhenAnyUnhandled({
					declarations:
						[],
					dependsUponIdentifiers:
						[ ...dependsUponIdentifiers.getGroupedByParent() ],
				});
			},
		)
		.toThrowError(`Unhandled dependencies:\nExpression from character 0 to ${javascript.length} contains unhandled identifiers of "${identifier}"`);
	},
);

test(
	"Unhandled dependency in parent with identifier throws error with message including parent identifier.",
	() => {
		const
			identifier = "called",
			parentIdentifier = "caller";

		const javascript = `function ${parentIdentifier}() { ${identifier}(); }`;

		expect(
			() => {
				const
					dependsUponIdentifiers = createDependsUponIdentifiers(),
					parent = parse(javascript);

				dependsUponIdentifiers.addIdentifierToParent({
					identifier,
					parent:
						parent.program.body[0],
				});

				throwErrorWhenAnyUnhandled({
					declarations:
						[],
					dependsUponIdentifiers:
						[ ...dependsUponIdentifiers.getGroupedByParent() ],
				});
			},
		)
		.toThrowError(`Unhandled dependencies:\nExpression from character 0 to ${javascript.length} with identifier "${parentIdentifier}" contains unhandled identifiers of "${identifier}"`);
	},
);