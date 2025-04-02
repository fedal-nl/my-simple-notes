import { Client, Account, ID, Databases, Query } from 'react-native-appwrite';


const config = {
    platform: process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_ID,
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    db_id: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    col: {
        notes: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
    }
}

const client = new Client()
    .setProject(config.projectId!)
    .setPlatform(config.platform!)
    .setEndpoint(config.endpoint!);

const database = new Databases(client);

const account = new Account(client);

export { client, database, config, ID, account, Query };
