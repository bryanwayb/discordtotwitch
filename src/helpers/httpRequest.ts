import http from 'http';
import { URL } from 'url';

function performRequest(url: URL, method: string, data?: string): Promise<http.IncomingMessage> {
	return new Promise((resolve, reject) => {
		const request = http.request(url, {
			method
		}, (response) => {
			resolve(response);
		});

		request.on('error', (error) => {
			reject(error);
		});

		if (data) {
			request.write(data);
		}

		request.end();
	});
}

export function httpGetJSON<T>(url: URL): Promise<T> {
	return new Promise((resolve, reject) => {
		performRequest(url, 'get').then((response) => {
			let data = '';
			response.on('data', (chunk) => {
				data += chunk;
			});

			response.on('end', () => {
				try {
					const parsedData: T = JSON.parse(data);
					resolve(parsedData);
				}
				catch (ex) {
					reject(ex);
				}
			});
		}, (error) => {
			reject(error);
		});
	});
}