const findItemWithIdentifierInLastAncestor = require("./findItemWithIdentifierInLastAncestor");

module.exports =
	({
		ancestors,
		dependUponItem,
	}) => {
		return (
			typeof dependUponItem === "string"
			&&
			[ whenItemFound() || withAncestors() ]
		);

		function whenItemFound() {
			const item =
				findItemWithIdentifierInLastAncestor({
					ancestors,
					identifier: dependUponItem,
				});

			return (
				item
				&&
				{
					ancestor: ancestors[ancestors.length - 1],
					item,
				}
			);
		}

		function withAncestors() {
			return (
				{
					ancestors,
					item: dependUponItem,
				}
			);
		}
	};