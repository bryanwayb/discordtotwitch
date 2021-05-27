import MongoTransaction from './mongoClientProvider';

export async function GetUser(userId: string): Promise<any> {
	return await MongoTransaction<any>(async (client) => {
		return await client.db('base').collection('users').findOne({
			userId
		});
	});
}