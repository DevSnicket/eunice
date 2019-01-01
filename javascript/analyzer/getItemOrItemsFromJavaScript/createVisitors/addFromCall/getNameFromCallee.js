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
				callee.object.name
			);
		}
	};