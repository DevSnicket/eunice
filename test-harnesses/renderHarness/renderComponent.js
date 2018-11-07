const
	{ Component, createElement } = require("react"),
	{ render } = require("react-dom");

// for webpack
require("file-loader?name=harness.html!./harness.html");
require("file-loader?name=react-reflex.css!react-reflex/styles.css");

module.exports =
	component =>
		render(
			createElement(
				(props, context) => {
					const componentMixin =
						{
							...Component.prototype,
							context,
							props,
							...component,
						};

					window.addEventListener(
						"hashchange",
						() => componentMixin.forceUpdate(),
					);

					return componentMixin;
				},
			),
			document.getElementById("container"),
		);