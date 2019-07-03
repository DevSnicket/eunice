/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createParameterTextareas = require("./createParameterTextareas");

module.exports =
	({
		createElement,
		processor,
		setState,
	}) => {
		return (
			createElement(
				"li",
				{ style: { display: "flex" } },
				createElement(
					"label",
					null,
					createCheckbox(),
					processor.text,
				),
				...createParameterTextareas({
					createElement,
					processor,
					setState,
				}),
			)
		);

		function createCheckbox() {
			return (
				createElement(
					"input",
					{
						onChange:
							event =>
								setState({ isEnabled: event.target.checked }),
						type:
							"checkbox",
					},
				)
			);
		}
	};