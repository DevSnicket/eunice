/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const stackItemsWhenMultiple = require("../stackItemsWhenMultiple");

module.exports =
	function * createItemsProperty({
		classDeclarationOrExpression,
		constructor,
		createItemsForAndRemoveDeclarationsIn,
	}) {
		const items =
			stackItemsWhenMultiple({
				items:
					[
						...getItemsFromClass() || [],
						...getItemsFromConstructor() || [],
					],
				withSingleInArray:
					false,
			});

		if (items)
			yield { items };

		function getItemsFromClass() {
			return (
				createItemsForAndRemoveDeclarationsIn(
					classDeclarationOrExpression,
				)
			);
		}

		function getItemsFromConstructor() {
			return (
				constructor
				&&
				createItemsForAndRemoveDeclarationsIn(
					constructor.value,
				)
			);
		}
	};