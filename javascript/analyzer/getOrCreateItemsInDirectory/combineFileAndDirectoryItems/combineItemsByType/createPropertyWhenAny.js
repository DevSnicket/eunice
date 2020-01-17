// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const getWhenSingle = require("../../getWhenSingle");

module.exports =
	({
		name,
		values,
	}) => {
		return whenAny();

		function whenAny() {
			return (
				values.length
				&&
				createProperty()
			);

			function createProperty() {
				return (
					{
						[name]:
							getWhenSingle(values)
							||
							values,
					}
				);
			}
		}
	};