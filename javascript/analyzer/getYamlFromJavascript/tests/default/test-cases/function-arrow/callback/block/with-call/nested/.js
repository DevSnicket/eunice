called(
	parameter => { 
		calledByCallback(
			() => {
				calledByCallbackOfCallback(parameter);
			},
		);
	},
);