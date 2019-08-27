// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		constructor,
		createDependsUponPropertyForParent,
		superClass,
	}) => {
		return whenHasConstructor() || whenHasBase();

		function whenHasConstructor() {
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
		}

		function * whenHasBase() {
			const base = getBase();

			if (base)
				yield { dependsUpon: base };
		}

		function getBase() {
			return (
				superClass
				&&
				superClass.name
			);
		}
	};