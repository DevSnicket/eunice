/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		arrow,
		count,
		createTextGroup,
		font,
		key,
	}) => {
		return (count > 0) && create();

		function create() {
			const width = font.measure(count) + arrow.horizontalMargin;

			return (
				{
					createAtPosition:
						({
							left,
							top,
						}) =>
							createTextGroup({
								attributes: { href: `#${arrow.id}` },
								className: "dependency",
								elementName: "use",
								height: arrow.height,
								key,
								left,
								padding:
									{
										left: (width - arrow.paddingRight) / 2,
										top: 12,
									},
								text: count,
								top,
								width,
							}),
					height:
						arrow.height,
					width,
				}
			);
		}
	};