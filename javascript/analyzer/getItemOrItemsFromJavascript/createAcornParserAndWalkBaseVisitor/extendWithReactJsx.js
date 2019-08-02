/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		Parser,
		isReactJsxEnabled,
		walkBaseVisitor,
	}) => {
		return (
			whenEnabled()
			||
			{
				Parser,
				walkBaseVisitor,
			}
		);

		function whenEnabled() {
			return (
				isReactJsxEnabled
				&&
				{
					Parser: extendParser(),
					walkBaseVisitor: extendWalkBaseVisitor(),
				}
			);
		}

		function extendParser() {
			return (
				Parser.extend(
					// Acorn JSX is a peer dependency and this require is conditional
					// eslint-disable-next-line global-require
					require("acorn-jsx")(),
				)
			);
		}

		function extendWalkBaseVisitor() {
			const extendedBaseVisitor = { ...walkBaseVisitor };

			// Acorn JSX walk is a peer dependency and this require is conditional
			// eslint-disable-next-line global-require
			require("acorn-jsx-walk")
			.extend(extendedBaseVisitor);

			return extendedBaseVisitor;
		}
	};