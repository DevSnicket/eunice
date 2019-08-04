/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createDeclarations = require("../createDeclarations"),
	createDependsUponIdentifiers = require("../createDependsUponIdentifiers"),
	{ parse } = require("@babel/parser"),
	throwErrorWhenAnyUnhandled = require("../throwErrorWhenAnyUnhandled");

test(
	"Unhandled declaration throws error.",
	() => {
		const
			identifier = "variable",
			parent = { end: 2, start: 1 };

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
		.toThrowError(`Unhandled declarations:\nExpression from character ${parent.start} to ${parent.end} contains unhandled identifiers of "${identifier}"`);
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