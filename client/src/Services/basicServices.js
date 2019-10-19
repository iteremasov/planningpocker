export const fetchJsonPost = async (url, body) => {
	try {
		const response = await fetch(url, {
			body: body,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (error) {
		return error;
	}
};
