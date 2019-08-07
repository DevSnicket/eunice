/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	addArgumentsToNestedCallMap = require("./addArgumentsToNestedCallMap"),
	getIdentifierNameFromAndAddOrUpdateReferenceOfParent = require("./getIdentifierNameFromAndAddOrUpdateReferenceOfParent"),
	getNameFromCallee = require("./getNameFromCallee"),
	getPropertyName = require("../getPropertyName");

const ignoreStaticMethodsOfDefault =
	[
		"Array",
		"ArrayBuffer",
		"BigInt64Array",
		"BigUint64Array",
		"Date",
		"Float32Array",
		"Float64Array",
		"Function",
		"Int16Array",
		"Int32Array",
		"Int8Array",
		"JSON",
		"Math",
		"Number",
		"Object",
		"Promise",
		"Reflect",
		"String",
		"Symbol",
		"Uint16Array",
		"Uint32Array",
		"Uint8Array",
		"Uint8ClampedArray",
	];

module.exports =
	({
		addDependsUponIdentifierToParent,
		addUndeclaredReference,
		callExpression,
		findDeclarationAndParent,
		findParentFunctions,
		ignoreStaticMethodsOf = ignoreStaticMethodsOfDefault,
		isVariableInBlockScoped,
	}) => {
		const calleeName = getNameFromCallee(callExpression.callee);

		if (calleeName && !isIgnored())
			addFromParentFunctions(
				findParentFunctions(),
			);

		function isIgnored() {
			return (
				calleeName === "require"
				||
				whenIgnoreStaticMethodOf()
			);

			function whenIgnoreStaticMethodOf() {
				return (
					ignoreStaticMethodsOf
					&&
					ignoreStaticMethodsOf.includes(calleeName)
				);
			}
		}

		function addFromParentFunctions(
			parentFunctions,
		) {
			addDependsUponIdentifier(
				getIdentifierNameFromAndAddOrUpdateReference(
					calleeName,
				),
			);

			addArgumentsToNestedCallMap({
				addDependsUponIdentifier,
				callExpression,
				getIdentifierNameFromAndAddOrUpdateReference,
			});

			function getIdentifierNameFromAndAddOrUpdateReference(
				reference,
			) {
				return (
					getIdentifierNameFromAndAddOrUpdateReferenceOfParent({
						addUndeclaredReference,
						findDeclarationAndParent,
						parentFunctions,
						reference,
					})
				);
			}

			function addDependsUponIdentifier(
				identifier,
			) {
				if (isIdentifierRelevant())
					addDependsUponIdentifierToParent({
						identifier,
						parent: getParent(),
					});

				function isIdentifierRelevant() {
					return (
						identifier
						&&
						identifier !== "arguments"
						&&
						!isVariableInBlockScoped(identifier)
						&&
						!isParameterOfAnyParentFunction(identifier)
					);
				}

				function getParent() {
					return whenIdentifiable() || null;

					function whenIdentifiable() {
						return (
							parentFunctions
							&&
							parentFunctions.identifiable
						);
					}
				}
			}

			function isParameterOfAnyParentFunction(
				name,
			) {
				return (
					parentFunctions
					&&
					(ofIdentifiable() || ofAnonymous())
				);

				function ofIdentifiable() {
					return (
						parentFunctions.identifiable
						&&
						isParameterOfParentFunction(parentFunctions.identifiable)
					);
				}

				function ofAnonymous() {
					return (
						parentFunctions.anonymous
						&&
						parentFunctions.anonymous.some(isParameterOfParentFunction)
					);
				}

				function isParameterOfParentFunction(
					parentFunction,
				) {
					return (
						parentFunction.params.some(isParameter)
					);
				}

				function isParameter(
					parameter,
				) {
					return (
						whenObject()
						||
						whenRest()
						||
						parameter.name === name
					);

					function whenObject() {
						return (
							parameter.type === "ObjectPattern"
							&&
							parameter.properties.some(property => getPropertyName(property) === name)
						);
					}

					function whenRest() {
						return (
							parameter.type === "RestElement"
							&&
							parameter.argument.name === name
						);
					}
				}
			}
		}
	};