module.exports =
	({
		from,
		stack,
		to,
	}) => {
		return isSame() ? 0 : getOffset();

		function isSame() {
			return from == to;
		}

		function getOffset() {
			return getIndexOf(to) - stack.indexOf(from);
		}

		function getIndexOf(
			item
		) {
			const index = stack.indexOf(item);

			return (
				index == -1
				?
				getIndexOf(item.parent)
				:
				index);
		}
	};