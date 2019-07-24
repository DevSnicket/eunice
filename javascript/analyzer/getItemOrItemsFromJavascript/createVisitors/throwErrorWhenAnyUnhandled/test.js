/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createDeclarations = require("../createDeclarations"),
	createDependsUponIdentifiers = require("../createDependsUponIdentifiers"),
	{ parse } = require("acorn"),
	throwErrorWhenAnyUnhandled = require(".");

test(
	"Unhandled declaration throws error.",
	() => {
		const identifier = "variable";

		const javascript = `const ${identifier} = null;`;

		expect(
			() => {
				const
					declarations = createDeclarations(),
					parent = parse(javascript);

				declarations.addDeclarationsIn({
					declarations: parent.body[0].declarations,
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
		.toThrowError(`Unhandled declarations:\nExpression from character 0 to ${javascript.length} contains unhandled identifiers of "${identifier}"`);
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

				dependsUponIdentifiers.addIdentifierFrom({
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

				dependsUponIdentifiers.addIdentifierFrom({
					identifier,
					parent:
						parent.body[0],
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