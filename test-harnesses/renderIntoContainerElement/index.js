/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import "./index.css";

import { Component, createElement } from "react";
import { render } from "react-dom";

export default
/**
 * @param {Object} parameter
 * @param {renderStateful} parameter.renderStateful
 * @param {State} [parameter.initialState]
 *
 * @callback renderStateful
 * @param {Stateful} stateful
 * @returns {import("react/index").ReactNode}
 *
 * @typedef Stateful
 * @property {State} state
 * @property {setState} setState
 *
 * @callback setState
 * @param {State} state
 */
/**
 * @template State
 */
({
	renderStateful,
	initialState,
}) =>
	render(
		createElement(
			// @ts-ignore
			(props, context) => {
				const componentMixin =
					{
						...Component.prototype,
						context,
						props,
						render() {
							return renderStateful(this);
						},
						state: initialState,
					};

				window.addEventListener(
					"hashchange",
					// @ts-ignore
					() => componentMixin.forceUpdate(),
				);

				return componentMixin;
			},
		),
		document.getElementById("container"),
	);