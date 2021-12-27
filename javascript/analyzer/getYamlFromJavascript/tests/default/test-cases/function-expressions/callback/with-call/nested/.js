called(
	function (parameter) {
		calledByCallback(
			function() { 
				calledByCallbackOfCallback(parameter);
			},
		);
	},
);