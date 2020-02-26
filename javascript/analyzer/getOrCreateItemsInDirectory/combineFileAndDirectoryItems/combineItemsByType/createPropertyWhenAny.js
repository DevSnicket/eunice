// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getWhenSingle from "../../getWhenSingle";

export default ({
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