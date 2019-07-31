/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		classDeclarationOrExpression,
		createDependsUponPropertyForParent,
	}) => {
		return whenHasConstructor() || whenHasBase();

		function whenHasConstructor() {
			const constructor = findConstructor();

			return (
				constructor
				&&
				whenHasDependsUpon()
			);

			function * whenHasDependsUpon() {
				const property = createProperty();

				if (property)
					yield property;

				function createProperty() {
					return (
						createDependsUponPropertyForParent({
							identifiers:
								getBaseIdentifiers(),
							parent:
								constructor.value,
						})
					);
				}

				function * getBaseIdentifiers() {
					const base = getBase();

					if (base)
						yield base;
				}
			}

			function findConstructor() {
				return (
					classDeclarationOrExpression.body.body
					.find(({ kind }) => kind === "constructor")
				);
			}
		}

		function * whenHasBase() {
			const base = getBase();

			if (base)
				yield { dependsUpon: base };
		}

		function getBase() {
			return (
				classDeclarationOrExpression.superClass
				&&
				classDeclarationOrExpression.superClass.name
			);
		}
	};