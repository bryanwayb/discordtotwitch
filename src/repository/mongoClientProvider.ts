import { MongoClient } from 'mongodb';
import config from '../config';

export type TransactionHandler<T> = (client: MongoClient) => Promise<T>;

export default function MongoTransaction<T>(handler: TransactionHandler<T>): Promise<T> {
    return new Promise((resolve, reject) => {
		const client = new MongoClient(config.get('mongodb__url'), {
			useUnifiedTopology: true
		});

		client.connect(async function (err) {
			if (!err) {
				try {
					const ret: T = await handler(client);

					resolve(ret);
				}
				catch (ex) {
					reject(ex);
				}
				finally {
					client.close();
				}
			}
		});
    });
}