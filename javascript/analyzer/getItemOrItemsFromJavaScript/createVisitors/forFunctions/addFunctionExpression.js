/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const getParentFromAncestors = require("../getParentFromAncestors");

module.exports =
	({
		addDeclarationIn,
		ancestors,
		createDeclarationForFunction,
		findParentFunctionFromAncestors,
		functionExpression,
	}) => {
		const parent = getParentFromAncestors(ancestors);

		switch (parent.type) {
			case "AssignmentExpression":
				addAssignment();
				break;
			case "ExportDefaultDeclaration":
				addVariable({
					identifier: null,
					type: "export",
				});
				break;
			case "VariableDeclarator":
				addVariable({
					identifier: parent.id.name,
					type: null,
				});
				break;
			default:
		}

		function addAssignment() {
			if (isModuleExportMemberExpression(parent.left))
				addModuleExport();
			else
				addVariable({
					identifier: parent.left.name,
					type: null,
				});

			function addModuleExport() {
				addDeclarationIn({
					declaration:
						createDeclarationForFunction({
							functionDeclarationOrExpression:
								functionExpression,
							identifier:
								functionExpression.id
								&&
								functionExpression.id.name,
							type:
								null,
						}),
					parent:
						null,
				});
			}
		}

		function addVariable({
			identifier,
			type,
		}) {
			addDeclarationIn({
				declaration:
					createDeclarationForFunction({
						functionDeclarationOrExpression:
							functionExpression,
						identifier,
						type,
					}),
				parent:
					findParentFunctionFromAncestors(
						ancestors,
					),
			});
		}
	};

function isModuleExportMemberExpression(
	node,
) {
	return (
		node.type === "MemberExpression"
		&&
		node.object.name === "module"
		&&
		node.property.name === "exports"
	);
}