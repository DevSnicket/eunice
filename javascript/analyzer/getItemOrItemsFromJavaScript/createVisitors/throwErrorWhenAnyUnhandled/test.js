const
	createDeclarations = require("../createDeclarations"),
	createDependsUponIdentifiers = require("../createDependsUponIdentifiers"),
	{ parse } = require("acorn"),
	throwErrorWhenAnyUnhandled = require(".");

test(
	"Unhandled declaration throws error.",
	() => {
		const identifier = "variable";

		const javaScript = `const ${identifier} = null;`;

		expect(
			() => {
				const
					declarations = createDeclarations(),
					parent = parse(javaScript);

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
		.toThrowError(`Unhandled declarations:\nExpression from character 0 to ${javaScript.length} contains unhandled identifiers of "${identifier}"`);
	},
);

test(
	"Unhandled dependency throws error.",
	() => {
		const identifier = "called";

		const javaScript = `${identifier}();`;

		expect(
			() => {
				const
					dependsUponIdentifiers = createDependsUponIdentifiers(),
					parent = parse(javaScript);

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
		.toThrowError(`Unhandled dependencies:\nExpression from character 0 to ${javaScript.length} contains unhandled identifiers of "${identifier}"`);
	},
);

test(
	"Unhandled dependency in parent with identifier throws error with message including parent identifier.",
	() => {
		const
			identifier = "called",
			parentIdentifier = "caller";

		const javaScript = `function ${parentIdentifier}() { ${identifier}(); }`;

		expect(
			() => {
				const
					dependsUponIdentifiers = createDependsUponIdentifiers(),
					parent = parse(javaScript);

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
		.toThrowError(`Unhandled dependencies:\nExpression from character 0 to ${javaScript.length} with identifier "${parentIdentifier}" contains unhandled identifiers of "${identifier}"`);
	},
);