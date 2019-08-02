/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{ Parser } = require("acorn"),
	{ base: walkBaseVisitor } = require("acorn-walk"),
	extendWithProposalsInStageThree = require("./extendWithProposalsInStageThree"),
	extendWithReactJsx = require("./extendWithReactJsx");

module.exports =
	({
		isProposalsInStage3Enabled,
		isReactJsxEnabled,
	}) =>
		extendWithReactJsx({
			isReactJsxEnabled,
			...extendWithProposalsInStageThree({
				Parser,
				isProposalsInStage3Enabled,
				walkBaseVisitor,
			}),
		});