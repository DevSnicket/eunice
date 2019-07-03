/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{
		safeDump: formatYaml,
		safeLoad: parseYaml,
	} = require("js-yaml");

module.exports =
	state =>
		state.processors
		?
		formatYaml(
			state.processors.reduce(
				(items, processor) => processItems({ items, processor }),
				parseYaml(state.yaml),
			),
			{ lineWidth: Number.MAX_SAFE_INTEGER },
		)
		:
		state.yaml;

function processItems({
	items,
	processor,
}) {
	return (
		processor.isEnabled
		?
		processor.action(
			getArguments(),
		)
		:
		items
	);

	function getArguments() {
		return (
			processor.parameter
			?
			{
				items,
				[processor.parameter.name]: processor.argument,
			}
			:
			items
		);
	}
}