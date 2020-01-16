// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		name,
		object,
		type,
	}) => {
		return (
			getWhenMember()
			||
			name
		);

		function getWhenMember() {
			return (
				type === "MemberExpression"
				&&
				getObjectName(object)
			);
		}
	};

function getObjectName({
	name,
	object,
}) {
	return (
		name
		||
		(object && getObjectName(object))
	);
}