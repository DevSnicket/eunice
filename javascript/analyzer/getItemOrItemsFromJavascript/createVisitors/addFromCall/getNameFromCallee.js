/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	callee => {
		return (
			getRequireWhenCalled()
			||
			getWhenMember()
			||
			callee.name
		);

		function getRequireWhenCalled() {
			return (
				callee.callee
				&&
				callee.callee.name === "require"
				&&
				callee.arguments[0].value
			);
		}

		function getWhenMember() {
			return (
				callee.type === "MemberExpression"
				&&
				getObjectName(callee.object)
			);
		}
	};

function getObjectName({
	name,
	object,
}) {
	return (
		name
		||
		(object && getObjectName(object))
	);
}