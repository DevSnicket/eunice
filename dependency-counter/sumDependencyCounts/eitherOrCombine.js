// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default (
	left,
	right,
	valueSelector,
) => {
	return (
		whenHasBoth()
		||
		left
		||
		right
	);

	function whenHasBoth() {
		return (
			left
			&&
			right
			&&
			valueSelector(left, right)
		);
	}
};