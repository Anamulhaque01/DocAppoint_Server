import { MongoClient, Db } from 'mongodb';

let dbConnection: Db | undefined;

export const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI environment variable is missing.");
        }
        
        const client = new MongoClient(uri);
        await client.connect();

        dbConnection = client.db('docappoint');
        console.log(`📡 Native MongoDB Connected Successfully to: docappoint`);
    } catch (error: any) {
        console.error(`❌ Native MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export const getDb = (): Db => {
    if (!dbConnection) {
        throw new Error('❌ Database not initialized. Call connectDB first.');
    }
    return dbConnection;
};