import https from "https";

export default url =>
	new Promise(
		resolve =>
			https.get(
				url,
				{ headers: { "User-Agent": "Mozilla/5.0" } },
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