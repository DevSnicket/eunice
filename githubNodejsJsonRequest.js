import https from "https";

export default url =>
	new Promise(
		resolve =>
			https.get(
				url,
				{
					headers: {
						...getAccessTokenHeaderFromProcessArguments(process.argv),
						"User-Agent": "Mozilla/5.0",
					},
				},
				result => {
					result.setEncoding("utf8");
					
					let body = "";
					
					result.on(
						"data",
						data => body += data,
					);
			
					result.on(
						"end",
						() =>
							resolve(
								JSON.parse(body),
							),
					);
				}
			),
	);


function getAccessTokenHeaderFromProcessArguments(
	_arguments,
) {
	const prefix = "--access-token=";

	return createProperty(getValue(find()));
	
	function find() {
		return (
			_arguments.find(
				argument => argument.startsWith(prefix),
			)
		);
	}

	function getValue(
		argument,
	) {
		return (
			argument
			&&
			argument.substring(prefix.length)
		);
	}

	function createProperty(
		value,
	) {
		return value && { Authorization: `token ${value}` };
	}
}