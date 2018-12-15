module.exports =
	commaSeparated => {
		return (
			splitItemsWhenArray()
			||
			splitWhenString()
			||
			[]
		);

		function splitItemsWhenArray() {
			return (
				Array.isArray(commaSeparated)
				&&
				commaSeparated.map(split)
			);
		}

		function splitWhenString() {
			return (
				typeof commaSeparated === "string"
				&&
				split(commaSeparated)
			);
		}
	};

function split(
	value,
) {
	return value.split(",");
}