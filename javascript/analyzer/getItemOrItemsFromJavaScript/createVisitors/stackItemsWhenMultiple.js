module.exports =
	({
		items,
		withSingleInArray,
	}) => {
		return (
			any()
			&&
			(getWhenSingle() || stack())
		);

		function any() {
			return (
				items
				&&
				items.length
			);
		}

		function getWhenSingle() {
			return (
				items.length === 1
				&&
				getSingle()
			);

			function getSingle() {
				return (
					withSingleInArray
					?
					items
					:
					items[0]
				);
			}
		}

		function stack() {
			return items.map(item => [ item ]);
		}
	};