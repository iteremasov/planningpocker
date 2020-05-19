export const fetchJsonPost = async (url, body) => {
	try {
    return await fetch(url, {
      body: body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
	} catch (error) {
		return error;
	}
};
