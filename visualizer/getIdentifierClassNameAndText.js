// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
identifier => {
	return {
		className:
			[ ...getClassNames() ].join(" "),
		text:
			identifier || "anonymous",
	};

	function * getClassNames() {
		yield "item";

		if (!identifier)
			yield "anonymous";
	}
};