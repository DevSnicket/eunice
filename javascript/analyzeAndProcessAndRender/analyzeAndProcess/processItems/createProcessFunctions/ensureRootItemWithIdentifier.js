module.exports =
	({
		identifier,
		items,
	}) => {
		return whenHasIdentifier() || items;

		function whenHasIdentifier() {
			return identifier && createItemWithIdentifier();

			function createItemWithIdentifier() {
				return (
					(isSingleAnonymous() && replaceIdentifier())
					||
					{
						id: identifier,
						items,
					}
				);

				function isSingleAnonymous() {
					return (
						!Array.isArray(items)
						&&
						!items.id
					);
				}

				function replaceIdentifier() {
					return (
						{
							id: identifier,
							...items,
						}
					);
				}
			}
		}
	};